// main.js
// Orchestrates the multi-agent flow between Bot 1 and Bot 2 iframes

const bot1Frame = document.getElementById('bot1-frame');
const bot2Frame = document.getElementById('bot2-frame');
const userInputForm = document.getElementById('user-input-form');
const userProblemInput = document.getElementById('user-problem');

let revolutionCount = 0;
const MAX_REVOLUTIONS = 5;
let flowActive = false;
let lastBot = null;
let lastMessage = '';

function startFlow(problem) {
    revolutionCount = 0;
    flowActive = true;
    lastBot = 'bot1';
    lastMessage = problem;
    // Start by sending user input to Bot 1
    bot1Frame.contentWindow.postMessage({ prompt: problem }, '*');
}

window.addEventListener('message', async (event) => {
    // Only handle messages from iframes
    if (!flowActive || !event.data || !event.data.response) return;
    const response = event.data.response;
    if (revolutionCount >= MAX_REVOLUTIONS) {
        flowActive = false;
        return;
    }
    if (lastBot === 'bot1') {
        // Bot 1 responded, send to Bot 2
        lastBot = 'bot2';
        bot2Frame.contentWindow.postMessage({ prompt: response }, '*');
    } else {
        // Bot 2 responded, send to Bot 1
        revolutionCount++;
        if (revolutionCount < MAX_REVOLUTIONS) {
            lastBot = 'bot1';
            bot1Frame.contentWindow.postMessage({ prompt: response }, '*');
        } else {
            flowActive = false;
        }
    }
});

userInputForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const problem = userProblemInput.value.trim();
    if (!problem) return;
    startFlow(problem);
});

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = { startFlow, handleBotMessage, getRevolutionCount };
}
