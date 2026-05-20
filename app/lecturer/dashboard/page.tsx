"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LecturerDashboard() {

  const [eocFile, setEocFile] = useState<File | null>(null);
  const [pwFile, setPwFile] = useState<File | null>(null);
  const [testFile, setTestFile] = useState<File | null>(null);

  const handleSave = async (
    category: string,
    file: File | null
  ) => {

    if (!file) {
      alert("Sila pilih PDF dahulu!");
      return;
    }

    const fileName = `${Date.now()}-${file.name}`;

    // Upload ke Supabase Storage
    const { data: uploadData, error: uploadError } =
      await supabase.storage
        .from("rubrics")
        .upload(fileName, file);

    if (uploadError) {
      alert("Upload PDF gagal!");
      console.log(uploadError);
      return;
    }

    // Dapatkan public URL
    const { data: publicUrlData } = supabase
      .storage
      .from("rubrics")
      .getPublicUrl(fileName);

    const fileUrl = publicUrlData.publicUrl;

    // Save ke database
    const { data, error } = await supabase
      .from("rubrics")
      .insert([
        {
          category: category,
          file_url: fileUrl
        }
      ]);

    if (error) {
      alert("Gagal simpan database!");
      console.log(error);
    } else {
      alert("Skema berjaya upload!");
      console.log(data);
    }
  };

  return (
    <main className="min-h-screen bg-blue-50 p-10">

      <h1 className="text-4xl font-bold text-blue-900 mb-2">
        Dashboard Pensyarah
      </h1>

      <p className="text-gray-700 mb-10">
        Upload Skema Jawapan Tugasan
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* EOC */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
            EOC
          </h2>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setEocFile(e.target.files?.[0] || null)
            }
            className="w-full border border-gray-300 rounded-lg p-3 mb-4"
          />

          <button
            onClick={() => handleSave("EOC", eocFile)}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl"
          >
            Simpan Skema
          </button>

        </div>

        {/* PW */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
            PW
          </h2>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setPwFile(e.target.files?.[0] || null)
            }
            className="w-full border border-gray-300 rounded-lg p-3 mb-4"
          />

          <button
            onClick={() => handleSave("PW", pwFile)}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl"
          >
            Simpan Skema
          </button>

        </div>

        {/* TEST */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
            TEST
          </h2>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setTestFile(e.target.files?.[0] || null)
            }
            className="w-full border border-gray-300 rounded-lg p-3 mb-4"
          />

          <button
            onClick={() => handleSave("TEST", testFile)}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl"
          >
            Simpan Skema
          </button>

        </div>

      </div>

    </main>
  );
}