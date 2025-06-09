import os
from flask import Flask, send_from_directory, render_template_string, request, jsonify
from flow import create_qa_flow


app = Flask(__name__, static_folder='.', template_folder='.')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    if os.path.exists(filename):
        return send_from_directory('.', filename)
    return 'File not found', 404

@app.route('/api/bot', methods=['POST'])
def bot_api():
    data = request.get_json()
    prompt = data.get('prompt', '')
    if not prompt:
        return jsonify({'error': 'No prompt provided'}), 400
    shared = {
        "question": prompt,
        "answer": None,
        "model": "gemma3:12b-it-qat"
    }
    qa_flow = create_qa_flow()
    qa_flow.run(shared)
    return jsonify({"response": shared["answer"]})

if __name__ == '__main__':
    app.run(debug=True)
