"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import MessageBubble from "./MessageBubble";
import ReplyBox from "./ReplyBox";
import { updateConversation } from "@/lib/chat";
export default function ChatWindow({ conversation, setConversation }) {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!conversation?.id) {
      setMessages([]);
      return;
    }

    fetchMessages();
  }, [conversation?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function fetchMessages() {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversation.id)
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      console.error(error);
      return;
    }

    setMessages(data);

    await updateConversation(conversation.id, {
      unread_count: 0,
    });

  }


  async function takeOver() {
    await updateConversation(conversation.id, {
      status: "human",
    });
  }

  useEffect(() => {
    if (!conversation) return;

    const channel = supabase
      .channel(`conversation-status-${conversation.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "conversations",
          filter: `id=eq.${conversation.id}`,
        },
        (payload) => {
          setConversation(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversation?.id]);

  useEffect(() => {
  if (!conversation?.id) return;

  const messageChannel = supabase
    .channel(`admin-messages-${conversation.id}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${conversation.id}`,
      },
      (payload) => {
        const newMessage = payload.new;

        setMessages((prev) => {
          if (prev.some((m) => m.id === newMessage.id)) {
            return prev;
          }

          return [...prev, newMessage];
        });
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(messageChannel);
  };
}, [conversation?.id]);

 async function endChat() {
  await updateConversation(conversation.id, {
    status: "bot",
    unread_count: 0,
  });
}

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a conversation
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">

      {/* Header */}

      <div className="border-b p-4 dark:border-zinc-800 flex justify-between items-center">

        <div>
          <h2 className="font-bold">
            {conversation.visitor_name || "Anonymous Visitor"}
          </h2>

          <p className="text-sm text-gray-500">
            {conversation.visitor_email || "No Email"}
          </p>

          <p className="text-xs mt-1">
            Status:
            <span className="font-semibold ml-1">
              {conversation.status}
            </span>
          </p>
        </div>

        {conversation.status === "waiting" && (
          <button
            onClick={takeOver}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            Take Over
          </button>
        )}
        {conversation.status === "human" && (
          <button
            onClick={endChat}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            End Chat
          </button>
        )}

      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-zinc-900">

        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}

        <div ref={messagesEndRef}></div>

      </div>

      {/* Reply */}

      <ReplyBox
        conversation={conversation}
        refreshMessages={fetchMessages}
      />

    </div>
  );
}