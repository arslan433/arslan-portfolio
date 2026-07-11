"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ConversationItem from "./ConversationItem";

export default function ConversationList({
  activeConversation,
  setActiveConversation,
}) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();

    const channel = supabase
      .channel("conversation-list")

      // New Conversation
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "conversations",
        },
        (payload) => {
          setConversations((prev) => [
            payload.new,
            ...prev,
          ]);
        }
      )

      // Conversation Updated
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "conversations",
        },
        (payload) => {

          setConversations((prev) => {

            const updated = prev.map((c) =>
              c.id === payload.new.id ? payload.new : c
            );

            // Latest updated conversation top par
            updated.sort(
              (a, b) =>
                new Date(b.updated_at) -
                new Date(a.updated_at)
            );

            return updated;

          });

          // Agar ye selected conversation hai
          if (
            activeConversation?.id === payload.new.id
          ) {
            setActiveConversation(payload.new);
          }

        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchConversations() {
    setLoading(true);

    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .order("updated_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
    } else {

      setConversations(data);

      if (data.length > 0 && !activeConversation) {
        setActiveConversation(data[0]);
      }

    }

    setLoading(false);
  }

  return (
    <div className="w-full h-full border-r dark:border-zinc-800 overflow-y-auto">

      <div className="p-4 border-b dark:border-zinc-800">
        <h2 className="font-bold text-lg">
          Conversations
        </h2>
      </div>

      {loading && (
        <p className="p-4 text-sm text-gray-500">
          Loading...
        </p>
      )}

      {!loading && conversations.length === 0 && (
        <p className="p-4 text-sm text-gray-500">
          No conversations found.
        </p>
      )}

      {!loading &&
        conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            activeConversation={activeConversation}
            onSelect={setActiveConversation}
          />
        ))}
    </div>
  );
}