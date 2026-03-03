import React, { useState, useRef, useEffect } from "react";
import gemini from '../api/gemini';
import Bubble from "./Bubble";

export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const getTime = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const ChatComponent = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [problemContext, setProblemContext] = useState<{ title: string; description: string } | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // 1. Initial Load and Listener Hook
  useEffect(() => {
    // Initial fetch from storage
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(["problem"], (result) => {
        if (result?.problem) {
          setProblemContext(result.problem);
        }
      });

      // Listener for context changes (e.g., clicking help on a new problem)
      const listener = (changes: any) => {
        if (changes.problem) {
          const newProblem = changes.problem.newValue;
          setProblemContext(newProblem);
          setMessages(prev => [...prev, {
            text: `Switched context to: **${newProblem.title}**`,
            sender: 'bot',
            timestamp: getTime()
          }]);
        }
      };

      chrome.storage.onChanged.addListener(listener);
      return () => chrome.storage.onChanged.removeListener(listener);
    }
  }, []); 

  //auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { text: input, sender: 'user', timestamp: getTime() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    const historyText = messages
    .map(m => `${m.sender === 'user' ? "User" : "bot"}: ${m.text}`)
    .join("\n");

    try {
      // Injecting context into the Gemini 
      const promptWithContext = problemContext 
        ? `Problem: ${problemContext.title}\nDescription: ${problemContext.description}\n\nUser Question: ${input}
        Previos Messages${historyText}`
        : input;

      const response = await gemini(promptWithContext);
      const botMessage: ChatMessage = {
        text: response || "Sorry, I couldn't get a response.",
        sender: 'bot',
        timestamp: getTime(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch {
      setMessages(prev => [
        ...prev,
        { text: "Error getting response. Try again.", sender: 'bot', timestamp: getTime() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleClear =()=>{
    setMessages([]);
    setInput("")
    setProblemContext({})

  }

  return (
    <div className="flex flex-col h-screen bg-bg-base">
      {/* Header */}
      <div className="bg-primary px-4 py-3 text-text-inverse shadow-md flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
          AI
        </div>
        <div>
          <h1 className="font-semibold text-sm">
            {problemContext ? problemContext.title : "StudBud Assistant"}
          </h1>
          <p className="text-[11px] opacity-70">{isLoading ? "Thinking..." : "Online"}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-center p-6">
             <p className="text-sm text-text-secondary italic">
              {problemContext 
                ? `Ready to help with ${problemContext.title}! What's confusing you?` 
                : "Ask me anything about your LeetCode problem! 💡"}
            </p>
          </div>
        )}
        {messages.map((msg, i) => (
          <Bubble key={i} text={msg.text} sender={msg.sender} timestamp={msg.timestamp} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-bubble-bot text-text-secondary px-4 py-3 rounded-2xl rounded-tl-none shadow-sm text-sm italic">
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-bg-surface border-t border-gray-200 px-3 py-3 flex items-center gap-2 shrink-0">
        <input
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
          type="text"
          placeholder="Ask about the problem..."
          value={input}
          disabled={isLoading}
          className="flex-1 bg-bg-base px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-primary text-sm disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-primary text-text-inverse p-2.5 rounded-full hover:bg-primary-dark disabled:opacity-40 hover:scale-105 transition-all"
        >
          <button
          onClick={handleClear}
          disabled={isLoading || !input.trim()}
          className="bg-color-primary-light text-black p-2.5 rounded-full hover:bg-primary-dark disabled:opacity-40 hover:scale-105 transition-all"
        ></button>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;