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

function botReply(message) {
    // Simple rule-based responses
    const msg = message.toLowerCase();
    if (msg.includes('hello') || msg.includes('hi')) {
        return "Hello! How can I help you today?";
    } else if (msg.includes('how are you')) {
        return "I'm just a bot, but I'm doing great!";
    } else if (msg.includes('name')) {
        return "I'm Chatterbot, your friendly assistant.";
    } else if (msg.includes('bye')) {
        return "Goodbye! Have a nice day!";
    } else {
        return "Sorry, I didn't understand that. Can you rephrase?";
    }
}

chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const userMsg = userInput.value.trim();
    if (!userMsg) return;
    appendMessage('user', userMsg);
    setTimeout(() => {
        const reply = botReply(userMsg);
        appendMessage('bot', reply);
    }, 400);
    userInput.value = '';
});

// Initial bot greeting
appendMessage('bot', "Hi! I'm Chatterbot. Ask me anything!");

// Add postMessage support for iframe agent mode
function receiveParentMessage(event) {
    if (!event.data || event.data.from !== 'parent') return;
    const userMsg = event.data.message;
    appendMessage('user', userMsg);
    setTimeout(() => {
        const reply = botReply(userMsg);
        appendMessage('bot', reply);
        // Identify this bot (bot1 or bot2) by window.name
        window.parent.postMessage({ from: window.name || 'bot1', message: reply }, '*');
    }, 400);
}

window.addEventListener('message', receiveParentMessage);
