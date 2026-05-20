"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LecturerLoginPage() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (
      username === "lecturer" &&
      password === "admin123"
    ) {
      router.push("/lecturer/dashboard");
    } else {
      alert("Username atau Password Salah!");
    }
  };

  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-[400px]">

        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          Login Pensyarah
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold"
        >
          Login
        </button>

      </div>

    </main>
  );
}