import type { NextApiRequest, NextApiResponse } from "next";
import { AgentBuilder, InMemorySessionService } from "@iqai/adk";
import dotenv from "dotenv";

dotenv.config();

const sessionService = new InMemorySessionService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { message, sessionId = "default-session" } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const agentResult = await AgentBuilder.create("task_manager")
      .withModel("gpt-4") // swap in gemini-pro, claude, etc.
      .withInstruction(
        "You are a task assistant. Help users track tasks, add new ones, list current ones, and remove completed ones."
      )
      .withSession(sessionService, "user-1", sessionId)
      .build();

    const runner = agentResult?.runner;
    const session = agentResult?.session;
    if (!runner || !session) {
      return res
        .status(500)
        .json({ error: "Failed to initialize agent session." });
    }

    let response = "";

    for await (const e of runner.runAsync({
      userId: "user-1",
      sessionId: session.id,
      newMessage: {
        parts: [{ text: message }],
      },
    })) {
      if (!e.partial && e.content?.parts?.[0]?.text) {
        response += e.content.parts[0].text;
      }
    }

    res.status(200).json({ reply: response, sessionId: session.id });
  } catch (err) {
    console.error("Handler error:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
}
