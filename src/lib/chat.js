import { supabase, isPlaceholderSupabase } from "./supabase";
import { v4 as uuidv4 } from "uuid";

export async function getOrCreateConversation() {
  let visitorId = localStorage.getItem("visitor_id");

  if (!visitorId || visitorId === "undefined" || visitorId === "null") {
    visitorId = uuidv4();
    localStorage.setItem("visitor_id", visitorId);
  }

  if (isPlaceholderSupabase) {
    let localConvoStr = localStorage.getItem("local_convo");
    let localConvo = null;
    if (localConvoStr && localConvoStr !== "undefined" && localConvoStr !== "null") {
      try {
        localConvo = JSON.parse(localConvoStr);
      } catch (e) {
        console.error("Failed to parse local_convo", e);
      }
    }

    if (!localConvo) {
      localConvo = {
        id: "local-chat-" + visitorId,
        visitor_id: visitorId,
        status: "bot",
        unread_count: 0,
        last_message: "",
        updated_at: new Date().toISOString()
      };
      localStorage.setItem("local_convo", JSON.stringify(localConvo));
    }
    return localConvo;
  }

  const { data: conversation } = await supabase
    .from("conversations")
    .select("*")
    .eq("visitor_id", visitorId)
    .maybeSingle();

  if (conversation) return conversation;

  const { data, error } = await supabase
    .from("conversations")
    .insert({
      visitor_id: visitorId,
      status: "bot",
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function saveMessage(conversationId, sender, message) {
  if (isPlaceholderSupabase) {
    const newMessage = {
      id: uuidv4(),
      conversation_id: conversationId,
      sender,
      message,
      created_at: new Date().toISOString()
    };

    let localMsgsStr = localStorage.getItem("local_messages_" + conversationId) || "[]";
    let localMsgs = [];
    if (localMsgsStr && localMsgsStr !== "undefined" && localMsgsStr !== "null") {
      try {
        localMsgs = JSON.parse(localMsgsStr);
      } catch (e) {
        localMsgs = [];
      }
    }
    localMsgs.push(newMessage);
    localStorage.setItem("local_messages_" + conversationId, JSON.stringify(localMsgs));

    let localConvoStr = localStorage.getItem("local_convo");
    if (localConvoStr && localConvoStr !== "undefined" && localConvoStr !== "null") {
      try {
        let convo = JSON.parse(localConvoStr);
        convo.last_message = message;
        convo.updated_at = new Date().toISOString();
        if (sender === "user") {
          convo.unread_count = (convo.unread_count || 0) + 1;
        }
        localStorage.setItem("local_convo", JSON.stringify(convo));
      } catch (e) {}
    }

    return newMessage;
  }

  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender,
      message,
    })
    .select()
    .single();

  if (error) throw error;

  const updateData = {
    last_message: message,
    updated_at: new Date().toISOString(),
  };

  if (sender === "user") {
    const { data: convo } = await supabase
      .from("conversations")
      .select("unread_count")
      .eq("id", conversationId)
      .single();

    updateData.unread_count = (convo?.unread_count || 0) + 1;
  }

  await supabase
    .from("conversations")
    .update(updateData)
    .eq("id", conversationId);

  return data;
}

export async function loadMessages(conversationId) {
  if (isPlaceholderSupabase) {
    let localMsgsStr = localStorage.getItem("local_messages_" + conversationId) || "[]";
    if (localMsgsStr && localMsgsStr !== "undefined" && localMsgsStr !== "null") {
      try {
        return JSON.parse(localMsgsStr);
      } catch (e) {
        return [];
      }
    }
    return [];
  }

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data || [];
}

export async function updateConversation(id, data) {
  if (isPlaceholderSupabase) {
    let localConvoStr = localStorage.getItem("local_convo");
    if (localConvoStr && localConvoStr !== "undefined" && localConvoStr !== "null") {
      try {
        let convo = JSON.parse(localConvoStr);
        convo = { ...convo, ...data };
        localStorage.setItem("local_convo", JSON.stringify(convo));
      } catch (e) {}
    }
    return;
  }

  const { error } = await supabase
    .from("conversations")
    .update(data)
    .eq("id", id);

  if (error) {
    console.error(error);
  }
}
