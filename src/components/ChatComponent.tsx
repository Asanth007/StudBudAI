import React, { useState } from "react";
import gemini from '../api/gemini'
const Aichat = () => {
  const [userMessage, setuserMessage] = useState("");
  const [botmessage,setBotMessage]=useState("");
  
  const handleSend = async () => {
     if (!userMessage.trim()) return;
    const response = await gemini(userMessage);
    setBotMessage(response || "");
    setuserMessage("");
  };
  

  return (
    <div className="flex flex-col h-screen bg-[#efe7de]">
      {/* Header here */}
      <div className="bg-brand-purple p-4 text-white shadow-md flex items-center">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
          AI
        </div>
        <div className="ml-3">
          <h1 className="font-bold text-sm">Assistant</h1>
          <p className="text-xs opacity-80">Online</p>
        </div>
      </div>

      {/* Message */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 ">
        <div className="flex justify-start">
          <div className="bg-white text-gray-800 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%]">
            <p className="text-sm">{botmessage}</p>
            <span className="text-[10px] text-gray-400 block mt-1 text-right">
              10:45 AM
            </span>
          </div>
        </div>

        <div className="flex justify-end ">
          <div className="bg-[#dcf8c6] text-gray-800 p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]">
            <p className="text-sm">{userMessage}</p>
            <span className="text-[10px] text-gray-400 block mt-1 text-right">
              10:46 AM
            </span>
          </div>
        </div>

        {/* Input Chat */}
      </div>
      <div className="bg-gray-100 p-3 flex items-center gap-2 ">
        <input
          onChange={(e) => {
            setuserMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          type="text"
          placeholder="Type a message..."
          value={userMessage}
          className="flex-1 bg-white p-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:border-brand-purple text-sm"
        />
        <button
          onClick={handleSend}
          className="bg-brand-purple text-white p-2 rounded-full hover:scale-105 transition-transform"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Aichat;
