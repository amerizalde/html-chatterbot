SERVER_URL = "http://192.168.0.240:11434"

def get_ollama_models():
    try:
        import requests
        resp = requests.get(f'{SERVER_URL}/api/tags', timeout=3)
        resp.raise_for_status()
        return [m["name"] for m in resp.json()['models']]
    except Exception:
        return []

ollama_models = get_ollama_models()

if __name__ == "__main__":
    print("Available models:", ollama_models or "None")