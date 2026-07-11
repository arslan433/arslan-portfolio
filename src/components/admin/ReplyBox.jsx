"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ReplyBox({
  conversation,
  refreshMessages,
}) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function sendReply(e) {
    e.preventDefault();

    if (!message.trim() || sending) return;

    setSending(true);

    try {
      // Save admin message
      const { error } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversation.id,
          sender: "admin",
          message: message.trim(),
        });

      if (error) throw error;

      // Update conversation
      await supabase
  .from("conversations")
  .update({
    last_message: message.trim(),
    updated_at: new Date().toISOString(),
    status: "human",
  })
  .eq("id", conversation.id);

      setMessage("");

      await refreshMessages();

    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={sendReply}
      className="border-t dark:border-zinc-800 p-4 flex gap-2"
    >
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your reply..."
        className="flex-1 border rounded-lg px-3 py-2
        dark:bg-zinc-800 dark:border-zinc-700
        focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        disabled={sending}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg disabled:opacity-60"
      >
        {sending ? "..." : "Send"}
      </button>
    </form>
  );
}