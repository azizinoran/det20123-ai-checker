"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (
      username === "24DDT23F1001" &&
      password === "123456"
    ) {
      router.push("/student/dashboard");
    } else {
      alert("No Pendaftaran atau Password Salah!");
    }
  };

  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-[400px]">

        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          Login Pelajar
        </h1>

        <input
          type="text"
          placeholder="No Pendaftaran"
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