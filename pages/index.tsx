import { useState, useEffect, useRef } from "react";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Message = { user: string; bot: string };

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages & tasks from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("messages");
    const savedTasks = localStorage.getItem("tasks");
    if (savedMessages) setMessages(JSON.parse(savedMessages));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  // Persist messages & tasks
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setProcessing(true);

    // Add task if user mentions it
    const lower = input.toLowerCase();
    const addTaskMatch = lower.match(
      /(?:add|remember|do|create|go|get)\s(.+)/i
    );

    const updatedTasks = [...tasks];

    if (addTaskMatch) {
      const newTask = addTaskMatch[1].trim();
      if (newTask && !tasks.includes(newTask)) {
        updatedTasks.push(newTask);
        setTasks(updatedTasks);
      }
    }

    const taskContext = updatedTasks.length
      ? `Current tasks: ${updatedTasks.join(", ")}. `
      : "No tasks yet. ";

    const fullMessage = `${taskContext}\nUser: ${input}`;

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: fullMessage, sessionId }),
      });

      const data = await res.json();

      setMessages(prev => [...prev, { user: input, bot: data.reply }]);
      setSessionId(data.sessionId);
      setInput("");
    } catch (err) {
      console.error("Error:", err);
      setMessages(prev => [
        ...prev,
        { user: input, bot: "An error occurred. Please try again." },
      ]);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className={`${geistSans.className} ${geistMono.className}`}>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6 font-sans text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <div className="w-full max-w-xl">
          <h1 className="mb-8 text-center text-3xl font-bold">
            Task Manager Agent
          </h1>

          <div className="mb-8 max-h-96 overflow-y-auto space-y-6">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <p className="mb-2">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    You:
                  </span>{" "}
                  {msg.user}
                </p>
                <p>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    Agent:
                  </span>{" "}
                  {msg.bot}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              className="flex-1 rounded border border-gray-300 bg-white px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-blue-400"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="flex min-w-[90px] items-center justify-center rounded bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              disabled={!input.trim() || processing}>
              {processing ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                "Send"
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setMessages([]);
                setTasks([]);
                localStorage.removeItem("messages");
                localStorage.removeItem("tasks");
              }}
              className="text-sm text-red-500 hover:underline">
              Clear conversation and tasks
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
