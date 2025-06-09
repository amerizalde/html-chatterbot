// bot.js

const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.textContent = text;
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
    appendMessage('user', prompt);
    const response = await callBotAPI(prompt);
    appendMessage('bot', response);
    // Send response back to parent
    window.parent.postMessage({ response }, '*');
});

// Optional: Initial greeting
// appendMessage('bot', "Ready to help!");
