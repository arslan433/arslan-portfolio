"use client";
import { useEffect, useRef } from "react";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";

export default function ChatMessages({ messages, loading, chatEndRef }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // instant scroll to bottom
    //   containerRef.current.scrollTop = containerRef.current.scrollHeight;

      //  smooth scroll
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-zinc-950"
    >
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}

      {loading && <TypingIndicator />}

      <div ref={chatEndRef} />
    </div>
  );
}