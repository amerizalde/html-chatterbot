// main.js
// Orchestrates the multi-agent flow between Bot 1 and Bot 2 iframes

const bot1Frame = document.getElementById('bot1-frame');
const bot2Frame = document.getElementById('bot2-frame');
const userInputForm = document.getElementById('user-input-form');
const userProblemInput = document.getElementById('user-problem');

let revolutionCount = 0;
const MAX_REVOLUTIONS = 5;
let lastMessage = '';
let flowActive = false;

function startFlow(problem) {
    revolutionCount = 0;
    lastMessage = problem;
    flowActive = true;
    // Start by sending user input to Bot 1
    bot1Frame.contentWindow.postMessage({ from: 'parent', message: problem }, '*');
}

function handleBotMessage(event) {
    if (!flowActive) return;
    const { from, message } = event.data;
    if (revolutionCount >= MAX_REVOLUTIONS) {
        flowActive = false;
        return;
    }
    if (from === 'bot1') {
        // Bot 1 responded, send to Bot 2
        bot2Frame.contentWindow.postMessage({ from: 'parent', message }, '*');
    } else if (from === 'bot2') {
        // Bot 2 responded, send to Bot 1
        revolutionCount++;
        if (revolutionCount < MAX_REVOLUTIONS) {
            bot1Frame.contentWindow.postMessage({ from: 'parent', message }, '*');
        } else {
            flowActive = false;
        }
    }
}

function getRevolutionCount() {
    return revolutionCount;
}

window.addEventListener('message', handleBotMessage);

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
