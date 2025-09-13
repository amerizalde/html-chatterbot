import requests
import models

# Learn more about calling the LLM: https://the-pocket.github.io/PocketFlow/utility_function/llm.html

def call_llm(prompt, model=None, host=models.SERVER_URL):
    # Ensure model is not None or empty
    if model not in models.ollama_models:
        model = "gemma3:12b"
        print("*********************")
        print(f"Loading model: {model}")
        print("*********************")
    else:
        print("*********************")
        print(f"Loading model: {model}")
        print("*********************")
    url = f"{host}/api/generate"
    payload = {
        "model": model,
        "prompt": prompt,
        "stream": False
    }
    headers = {"Content-Type": "application/json"}

    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()["response"]
    except requests.exceptions.HTTPError as e:
        raise RuntimeError(f"LLM request failed: {e}\n{response.text}")

    
if __name__ == "__main__":
    prompt = "What is the meaning of life?"
    print(call_llm(prompt))
