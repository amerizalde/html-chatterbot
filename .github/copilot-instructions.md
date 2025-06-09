<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This project is an HTML/JavaScript Chatterbot web app.

Idea: build a website that gamifies LLM chatbots to demonstrate how they can respond and revise ideas
using a cooperative, iterative approach. The main site will have two iframes embedded that will
host an LLM chat interface. Using the postMessage API, the iframes will communicate with each other to solve a problem
that is entered by the user in a text box.
---
Coding standards, domain knowledge, and preferences that AI should follow.

- Use components from ShadCN @ https://ui.shadcn.com/
- us python Flask to serve the dev site.
- use python's Pocketflow to create the AI backend. (https://the-pocket.github.io/PocketFlow/guide.html)  
- use the utils directory to access LLM tools
- use a test-driven development approach. generate tests first, then generate code that can pass those tests.
