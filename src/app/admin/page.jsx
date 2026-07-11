"use client";

import { useEffect, useState } from "react";
import { auth, logout } from "@/lib/firebaseAuth";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Header from '@/components/Header';
import Link from "next/link";

export default function AdminPanel() {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            if (!u) router.push("/admin/login");
            else setUser(u);
        });

        return () => unsub();
    }, []);

    if (!user) return <div className="p-5">Loading...</div>;

    return (
        <div className="p-5 mt-5">
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <div className="flex gap-3">
                    <Link className="bg-green-500 rounded-xl px-6 py-2" href={'/'}>Home</Link>
                    <Link className="bg-green-500 rounded-xl px-6 py-2" href={'/admin/chats'}>Chats</Link>
                    <Link className="bg-green-500 rounded-xl px-6 py-2" href={'/admin/projects'}>Projects</Link>
                    <button onClick={logout} className="bg-red-600 text-white px-3 py-1">Logout</button>
                </div>
            </div>

        </div>
    );
}