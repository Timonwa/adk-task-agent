# AI Task Manager Agent with ADK-TS and Next.js

This is a Next.js application that demonstrates how to build an intelligent AI agent using ADK-TS (Agent Development Kit) from IQ AI. The project showcases a task management agent that can understand natural language commands, manage tasks, and maintain conversation context using localStorage for demo purposes.

This is the code demo for the blog post: **Building an AI Agent with ADK-TS and Next.js: A Step-by-Step Guide**.

Please give this repo a ⭐ if it was helpful to you.

## Table of Contents

- [AI Task Manager Agent with ADK-TS and Next.js](#ai-task-manager-agent-with-adk-ts-and-nextjs)
  - [Table of Contents](#table-of-contents)
  - [Demo](#demo)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
  - [Tech Stack](#tech-stack)
  - [License](#license)

## Demo

<img width="1352" alt="Screenshot 2025-07-07 at 9 52 34 PM" src="https://github.com/user-attachments/assets/e3bc3a63-eae1-4937-a0a2-9d8b96868c61" />


## Features

- Intelligent task management through natural language conversation
- Real-time AI responses powered by OpenAI GPT models
- Task persistence using localStorage (demo) with automatic saving
- Modern, responsive UI with dark mode support
- Scrollable chat interface with auto-scroll to latest messages
- Session management with ADK-TS framework

## Prerequisites

- Node.js (LTS version recommended)
- OpenAI API key (or Anthropic/Google Gemini keys)
- Basic knowledge of JavaScript/TypeScript and Next.js

## Getting Started

1. Clone the repository:

```bash
git https://github.com/Timonwa/adk-task-agent.git
cd adk-task-agent
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a .env.local file in the root directory and add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key
```

You can also use Anthropic or Google Gemini keys by modifying the `agent.ts` file accordingly.

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [ADK-TS](https://github.com/IQAIcom/adk-ts) - Agent Development Kit for TypeScript
- [OpenAI](https://openai.com/) - LLM provider for AI responses
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Usage

Once the application is running, you can interact with the AI agent using natural language commands:

- **Add tasks**: "Add buy groceries to my list" or "Remember to call mom"
- **List tasks**: "What are my current tasks?" or "Show me my to-do list"
- **Remove tasks**: "Remove groceries" or "Delete call mom"
- **Clear all**: "Clear all tasks" or "Reset my list"

The agent will remember your tasks between sessions thanks to localStorage persistence.

## License

This project is licensed under the [MIT License](LICENSE). See the LICENSE file for more information.
