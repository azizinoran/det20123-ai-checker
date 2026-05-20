"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EOCPage() {

  const [studentName, setStudentName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const handleUpload = async () => {

    if (!studentName || !file) {
      alert("Sila isi nama & pilih PDF!");
      return;
    }

    const fileName = `${Date.now()}-${file.name}`;

    // Upload PDF ke storage
    const { error: uploadError } = await supabase
      .storage
      .from("submissions")
      .upload(fileName, file);

    if (uploadError) {
      alert("Upload gagal!");
      console.log(uploadError);
      return;
    }

    // Dapat public URL
    const { data: publicUrlData } = supabase
      .storage
      .from("submissions")
      .getPublicUrl(fileName);

    const fileUrl = publicUrlData.publicUrl;

    // Save database
    const { error } = await supabase
      .from("submissions")
      .insert([
        {
          student_name: studentName,
          category: "EOC",
          file_url: fileUrl
        }
      ]);

    if (error) {
      alert("Gagal simpan database!");
      console.log(error);
    } else {
     // GET RUBRIC
const { data: rubricData } = await supabase
  .from("rubrics")
  .select("*")
  .eq("category", "EOC")
  .single();

if (!rubricData) {
  alert("Rubric tak jumpa!");
  return;
}

// ANALYZE
const response = await fetch("/api/analyze", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    studentUrl: fileUrl,
    rubricUrl: rubricData.file_url
  })
});

const result = await response.json();

setScore(result.score);

alert("Tugasan berjaya dihantar!"); 
    }
  };

  return (
    <main className="min-h-screen bg-blue-50 flex justify-center items-center p-6">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-xl">

        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Upload Tugasan EOC
        </h1>

        <input
          type="text"
          placeholder="Nama Pelajar"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        />

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
          className="w-full border border-gray-300 rounded-lg p-3 mb-6"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl"
        >
          Hantar Tugasan
        </button>
        {
  score !== null && (
    <div className="mt-6 bg-green-100 border border-green-400 p-4 rounded-xl">

      <h2 className="text-2xl font-bold text-green-800 mb-2">
        MATCH SCORE: {score}%
      </h2>

      {
        score >= 70
        ? (
          <p className="text-green-700">
            Tugasan mempunyai padanan tinggi dengan skema jawapan.
          </p>
        )
        : (
          <p className="text-red-700">
            Tugasan mempunyai padanan rendah dengan skema jawapan.
          </p>
        )
      }

    </div>
  )
}

      </div>

    </main>
  );
}