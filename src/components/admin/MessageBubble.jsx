"use client";

export default function MessageBubble({ message }) {
  const isUser = message.sender === "user";

  return (
    <div
      className={`flex mb-3 ${
        isUser ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl shadow text-sm ${
          isUser
            ? "bg-gray-200 text-black rounded-bl-none dark:bg-zinc-700 dark:text-white"
            : "bg-blue-600 text-white rounded-br-none"
        }`}
      >
        <p>{message.message}</p>

        <p className="text-[10px] opacity-70 mt-1 text-right">
          {new Date(message.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}