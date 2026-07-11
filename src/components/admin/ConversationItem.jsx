"use client";

export default function ConversationItem({
  conversation,
  activeConversation,
  onSelect,
}) {
  const isActive = activeConversation?.id === conversation.id;

  return (
    <div
      onClick={() => onSelect(conversation)}
      className={`cursor-pointer p-4 border-b transition-all duration-200 ${isActive
          ? "bg-blue-100 dark:bg-zinc-700"
          : "hover:bg-gray-100 dark:hover:bg-zinc-800"
        }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">
            {conversation.visitor_name || "Anonymous Visitor"}
          </h3>

          {conversation.unread_count > 0 && (
            <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full">
              {conversation.unread_count}
            </span>
          )}
        </div>

        <span
          className={`text-xs px-2 py-1 rounded-full ml-2 ${conversation.status === "bot"
              ? "bg-green-100 text-green-700"
              : conversation.status === "waiting"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-blue-100 text-blue-700"
            }`}
        >
          {conversation.status}
        </span>
      </div>

      <p className="text-[11px] text-gray-400 mt-2">
        {new Date(conversation.updated_at).toLocaleString()}
      </p>
    </div>
  );
}