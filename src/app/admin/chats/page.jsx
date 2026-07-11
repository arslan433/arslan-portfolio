"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logout } from "@/lib/firebaseAuth";
import ConversationList from "@/components/admin/ConversationList";
import ChatWindow from "@/components/admin/ChatWindow";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);

  // 1. Secure the route using Firebase Auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/admin/login");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsub();
  }, [router]);

  // 2. Prevent UI flickering during authentication checks
  if (!user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center dark:bg-zinc-950 dark:text-white">
        <p className="text-lg font-medium animate-pulse">Authenticating Admin...</p>
      </div>
    );
  }

  // 3. Render authenticated Admin Chat Interface
  return (
    <div className="h-screen flex flex-col dark:bg-zinc-950">

      {/* Top Admin Utility Bar */}
      <div className="flex justify-between items-center px-6 py-3 border-b dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <h1 className="text-xl font-bold dark:text-white">Admin Support Console</h1>
        <Link className="bg-green-500 rounded-xl px-6 py-2" href={'/admin/chats'}>Chats</Link>
        <Link className="bg-green-500 rounded-xl px-6 py-2" href={'/admin/projects'}>Projects</Link>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Main Content Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-80 border-r dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
          <ConversationList
            activeConversation={activeConversation}
            setActiveConversation={setActiveConversation}
          />
        </div>

        {/* Right Chat Panel Side */}
        <div className="flex-1 bg-white dark:bg-zinc-900">
          <ChatWindow
            conversation={activeConversation}
            setConversation={setActiveConversation}
          />
        </div>
      </div>

    </div>
  );
}
