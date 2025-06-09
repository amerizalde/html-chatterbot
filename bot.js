// bot.js

const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

// Add a markdown renderer (using marked.js CDN)
if (!window.markedLoaded) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
    script.onload = () => { window.markedLoaded = true; };
    document.head.appendChild(script);
}

function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    // Render markdown for bot responses, plain text for user
    if (sender === 'bot' && window.marked) {
        msgDiv.innerHTML = window.marked.parse(text);
    } else {
        msgDiv.textContent = text;
    }
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function callBotAPI(prompt) {
    const res = await fetch('/api/bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    return data.response || data.error || 'Error: No response';
}

window.addEventListener('message', async (event) => {
    if (!event.data || !event.data.prompt) return;
    const prompt = event.data.prompt;
    // Label the user message as coming from the other bot
    const botLabel = window.frameElement && window.frameElement.title ? window.frameElement.title : 'Bot';
    appendMessage('user', `[From other bot] ${prompt}`);
    const response = await callBotAPI(prompt);
    appendMessage('bot', `[${botLabel}] ${response}`);
    // Send response back to parent
    window.parent.postMessage({ response }, '*');
});

// Optional: Initial greeting
// appendMessage('bot', "Ready to help!");
