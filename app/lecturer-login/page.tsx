"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LecturerLoginPage() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });

  if (error) {
    alert("Login gagal!");
    console.log(error.message);
    return;
  }

  router.push("/lecturer/dashboard");
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

        <button
  onClick={() =>
    router.push("/lecturer-register")
  }
  className="w-full mt-4 border border-blue-700 text-blue-700 py-4 rounded-xl hover:bg-blue-50 transition"
>
  Daftar Pengguna Baru
</button>

      </div>

    </main>
  );
}