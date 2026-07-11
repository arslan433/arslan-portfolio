"use client";

import { useState } from "react";
import { login } from "@/lib/firebaseAuth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await login(email, password);
      router.push("/admin");
    } catch (err) {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="p-5 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="email" className="border p-2 w-full" placeholder="Email" />
        <input name="password" type="password" className="border p-2 w-full" placeholder="Password" />
        {error && <p className="text-red-600">{error}</p>}
        <button className="bg-black text-white p-2 w-full">Login</button>
      </form>
    </div>
  );
}
