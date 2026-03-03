import React from 'react'

interface BubbleProps {
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const Bubble = ({ text, sender, timestamp }: BubbleProps) => {
  const isBot = sender === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`px-4 py-3 rounded-2xl shadow-sm max-w-[80%] ${
        isBot
          ? 'bg-bubble-bot text-text-primary rounded-tl-none'
          : 'bg-bubble-user text-text-primary rounded-tr-none'
      }`}>
        <p className="text-sm whitespace-pre-wrap">{text}</p>
        <span className="text-[10px] text-text-secondary block mt-1 text-right">{timestamp}</span>
      </div>
    </div>
  );
};

export default Bubble;