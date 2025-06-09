# HTML Chatterbot

A modern, multi-agent web-based chatbot app using HTML, CSS, JavaScript, and Python Flask. The app demonstrates cooperative, iterative problem-solving between two LLM-powered bots, each running in its own iframe and communicating via the main page.

## Features
- Two LLM chatbots (Bot 1 and Bot 2) in separate iframes
- User submits a problem, which is iteratively discussed by the bots for 5 revolutions
- Each bot's chat window displays only its own responses, clearly labeled
- Bot responses are rendered as Markdown (with code highlighting)
- Responsive, Monokai-inspired dark UI
- Flask backend orchestrates the flow and serves static files
- Backend uses PocketFlow and a local LLM via utils/call_llm.py

## Usage

### 1. Install dependencies
```sh
pip install -r requirements.txt
```

### 2. Start the Flask server
```sh
python app.py
```

### 3. Open your browser and go to:
```
http://127.0.0.1:5000/
```

### 4. Enter a problem in the input box and watch the bots iterate on the solution.

## How it works
- The main page (`index.html`) contains two iframes, each running `bot.html`.
- When the user submits a problem, it is sent to Bot 1. Bot 1 responds, and its reply is sent to Bot 2. This alternates for 5 revolutions.
- Each bot iframe calls the backend `/api/bot` endpoint, which runs a PocketFlow pipeline to generate a response using a local LLM.
- Bot responses are rendered as Markdown for rich formatting and code display.

## Local LLM Integration
- The backend uses `utils/call_llm.py` to call a locally-hosted LLM (such as Ollama or similar) via HTTP API.
- You can configure the model and host in `call_llm.py`. By default, it uses `http://192.168.0.250:11434` and the model `devstral:24b`.
- To use a different model or host, edit the `call_llm` function in `utils/call_llm.py`.

## Requirements
- Python 3.8+
- Flask
- requests
- pocketflow (see https://the-pocket.github.io/PocketFlow/guide.html)

## Notes
- For best results, ensure your local LLM server is running and accessible at the configured host.
- The app is designed for local development and demonstration purposes.
