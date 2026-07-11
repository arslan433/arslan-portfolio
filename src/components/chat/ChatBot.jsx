"use client";

import { useEffect, useRef, useState } from "react";
import { supabase, isPlaceholderSupabase } from "@/lib/supabase";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { usePathname } from "next/navigation";
import { getOrCreateConversation, loadMessages } from "@/lib/chat";
import { MessageSquare, X, Send, Bot, User, CornerDownLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


export default function ChatBot() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I am Arslan's AI Assistant. Ask me anything about my developer's technical skills, case studies, or how to collaborate!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [humanStep, setHumanStep] = useState(null);
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const chatEndRef = useRef(null);

  // 1. On mount, check for a saved conversation ID
  useEffect(() => {
    const savedId = localStorage.getItem("chat_conversation_id");
    if (!savedId || savedId === "undefined" || savedId === "null") {
      localStorage.removeItem("chat_conversation_id");
      return; // no previous chat – ChatInput will create one later
    }

    if (isPlaceholderSupabase) {
      let localConvoStr = localStorage.getItem("local_convo");
      if (localConvoStr && localConvoStr !== "undefined" && localConvoStr !== "null") {
        try {
          setConversation(JSON.parse(localConvoStr));
        } catch (e) {
          console.error("Failed to parse local_convo in mount", e);
        }
      }
      return;
    }

    // fetch the existing conversation from Supabase (optional, you can also just set { id: savedId })
    const fetchConversation = async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .eq("id", savedId)
        .single();

      if (error) {
        console.error("Failed to fetch conversation:", error);
        localStorage.removeItem("chat_conversation_id");
        return;
      }
      setConversation(data);
    };

    fetchConversation();
  }, []);

  // 2. Whenever the conversation changes (new or updated), store its ID
  useEffect(() => {
    if (conversation?.id) {
      localStorage.setItem("chat_conversation_id", conversation.id);
    } else {
      localStorage.removeItem("chat_conversation_id");
    }
  }, [conversation?.id]);

  // 3. Load messages once we have a valid conversation
  useEffect(() => {
    if (!conversation?.id) return;

    async function initChat() {
      try {
        const history = await loadMessages(conversation.id);
        if (history.length > 0) {
          setMessages(
            history.map((msg) => ({
              id: msg.id,
              role: msg.sender === "user" ? "user" : "model",
              text: msg.message,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    }

    initChat();
  }, [conversation?.id]); // re‑run when conversation.id becomes available

  useEffect(() => {
    if (isPlaceholderSupabase || !conversation) return;

    const channel = supabase
      .channel(`chat-${conversation.id}`)
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

          setMessages(prev => {

            if (prev.some((m) => m.id === newMessage.id)) {
              return prev;
            }

            return [
              ...prev,
              {
                id: newMessage.id,
                role:
                  newMessage.sender === "user"
                    ? "user"
                    : "model",
                text: newMessage.message,
              },
            ];
          });

        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, [conversation]);

  useEffect(() => {
    if (isPlaceholderSupabase || !conversation?.id) return;

    console.log("SUBSCRIBE");

    const statusChannel = supabase
      .channel(`conversation-${conversation.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "conversations",
          filter: `id=eq.${conversation.id}`,
        },
        (payload) => {
          console.log("UPDATE EVENT");
          setConversation(payload.new);
        }
      )
      .subscribe();

    return () => {
      console.log("UNSUBSCRIBE");
      supabase.removeChannel(statusChannel);
    };
  }, [conversation?.id]);


  // useEffect(() => {
  //   chatEndRef.current?.scrollIntoView();
  // }, [messages, loading]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-1">
      <AnimatePresence>
        {isOpen && (
          // <div className="w-[380px] h-[500px] max-md:w-[320px] rounded-2xl shadow-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md flex flex-col overflow-hidden animate-fade-in">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
           className="w-[380px] h-[400px] max-md:w-[320px] rounded-2xl shadow-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md flex flex-col overflow-hidden "
          >
            <ChatHeader
              onClose={() => setIsOpen(false)}
            />

            <ChatMessages
              messages={messages}
              loading={loading}
              chatEndRef={chatEndRef}
            />

            <ChatInput
              conversation={conversation}
              setConversation={setConversation}

              messages={messages}
              setMessages={setMessages}
              loading={loading}
              setLoading={setLoading}

              humanStep={humanStep}
              setHumanStep={setHumanStep}

              visitorName={visitorName}
              setVisitorName={setVisitorName}

              visitorEmail={visitorEmail}
              setVisitorEmail={setVisitorEmail}

            />

          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
        id="open-chatbot-btn"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>

    </div>
  );
}