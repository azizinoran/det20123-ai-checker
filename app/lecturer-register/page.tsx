"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LecturerRegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleRegister() {
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Sila lengkapkan semua maklumat");
      return;
    }

    if (password !== confirmPassword) {
      alert("Kata laluan tidak sama");
      return;
    }

    setLoading(true);

    const { error } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Pendaftaran berjaya. Sila login."
    );

    router.push("/lecturer-login");
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-lg">
        <h1 className="text-5xl font-bold text-blue-900 text-center mb-10">
          Daftar Pensyarah
        </h1>

        <input
          type="text"
          placeholder="Nama Penuh"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
          className="w-full border rounded-xl p-4 mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border rounded-xl p-4 mb-4"
        />

        <input
          type="password"
          placeholder="Kata Laluan"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border rounded-xl p-4 mb-4"
        />

        <input
          type="password"
          placeholder="Sahkan Kata Laluan"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          className="w-full border rounded-xl p-4 mb-6"
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl transition"
        >
          {loading
            ? "Mendaftar..."
            : "Daftar"}
        </button>

        <button
          onClick={() =>
            router.push("/lecturer-login")
          }
          className="w-full mt-4 border border-blue-700 text-blue-700 py-4 rounded-xl hover:bg-blue-50 transition"
        >
          Kembali Login
        </button>
      </div>
    </main>
  );
}