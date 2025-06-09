// main.test.js
// Test the multi-agent flow logic for 5 revolutions

describe('Multi-agent flow', () => {
    let main;
    let bot1, bot2;
    let userInput;
    let revolutionCount;
    let lastMessage;

    beforeEach(() => {
        // Mock the iframes and postMessage
        bot1 = { contentWindow: { postMessage: jest.fn() } };
        bot2 = { contentWindow: { postMessage: jest.fn() } };
        userInput = 'Solve this problem';
        revolutionCount = 0;
        lastMessage = userInput;
        main = require('./main');
        main.__set__('bot1Frame', bot1);
        main.__set__('bot2Frame', bot2);
        main.__set__('revolutionCount', revolutionCount);
        main.__set__('lastMessage', lastMessage);
    });

    it('should start by sending user input to Bot 1', () => {
        main.startFlow(userInput);
        expect(bot1.contentWindow.postMessage).toHaveBeenCalledWith({ from: 'parent', message: userInput }, '*');
    });

    it('should alternate messages between bots for 5 revolutions', () => {
        main.startFlow(userInput);
        for (let i = 0; i < 5; i++) {
            // Simulate Bot 1 response
            main.handleBotMessage({ data: { from: 'bot1', message: 'Bot1 response ' + i } });
            expect(bot2.contentWindow.postMessage).toHaveBeenCalledWith({ from: 'parent', message: 'Bot1 response ' + i }, '*');
            // Simulate Bot 2 response
            main.handleBotMessage({ data: { from: 'bot2', message: 'Bot2 response ' + i } });
            expect(bot1.contentWindow.postMessage).toHaveBeenCalledWith({ from: 'parent', message: 'Bot2 response ' + i }, '*');
        }
        expect(main.getRevolutionCount()).toBe(5);
    });

    it('should stop after 5 revolutions', () => {
        main.startFlow(userInput);
        for (let i = 0; i < 5; i++) {
            main.handleBotMessage({ data: { from: 'bot1', message: 'Bot1 response ' + i } });
            main.handleBotMessage({ data: { from: 'bot2', message: 'Bot2 response ' + i } });
        }
        // Next message should not be forwarded
        main.handleBotMessage({ data: { from: 'bot1', message: 'Extra' } });
        expect(bot2.contentWindow.postMessage).not.toHaveBeenCalledWith({ from: 'parent', message: 'Extra' }, '*');
    });
});
