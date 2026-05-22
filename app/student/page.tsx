"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function StudentPage() {

  const [program, setProgram] = useState("DET");

  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  const [assessment, setAssessment] =
    useState("EOC");

  const [file, setFile] = useState<File | null>(
    null
  );

  // FETCH SUBJECTS
  useEffect(() => {
    fetchSubjects();
  }, [program]);

  async function fetchSubjects() {
    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .eq("program", program)
      .order("subject_code", {
        ascending: true,
      });

    if (!error && data) {
      setSubjects(data);
    }
  }

  // HANDLE CHECK
  async function handleCheck() {

    if (
      !program ||
      !selectedSubject ||
      !assessment ||
      !file
    ) {
      alert("Sila lengkapkan semua maklumat");
      return;
    }

    alert(
      "AI sedang menyemak tugasan anda..."
    );

    // nanti sambung OCR + AI analyze
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-8">

      <div className="w-full max-w-4xl bg-white rounded-[32px] shadow-2xl p-10">

        {/* TITLE */}
        <div className="text-center mb-10">

          <h1 className="text-5xl font-black text-blue-700">
            Student Assessment Portal
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            Upload tugasan untuk semakan AI
          </p>

        </div>

        {/* PROGRAM */}
        <div className="mb-6">

          <label className="block text-lg font-semibold mb-3">
            Pilih Program
          </label>

          <select
            value={program}
            onChange={(e) =>
              setProgram(e.target.value)
            }
            className="w-full border rounded-xl p-4"
          >
            <option value="DET">
              DET
            </option>

            <option value="DEP">
              DEP
            </option>

            <option value="DTK">
              DTK
            </option>

          </select>

        </div>

        {/* SUBJECT */}
        <div className="mb-6">

          <label className="block text-lg font-semibold mb-3">
            Sila Pilih Kod Kursus
          </label>

          <select
            value={selectedSubject}
            onChange={(e) =>
              setSelectedSubject(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-4"
          >

            <option value="">
              -- Pilih Subject --
            </option>

            {subjects.map((subject) => (
              <option
                key={subject.id}
                value={subject.id}
              >
                {subject.subject_code} —{" "}
                {subject.subject_name}
              </option>
            ))}

          </select>

        </div>

        {/* ASSESSMENT */}
        <div className="mb-6">

          <label className="block text-lg font-semibold mb-3">
            Sila Pilih Tugasan
          </label>

          <select
            value={assessment}
            onChange={(e) =>
              setAssessment(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-4"
          >

            <option>EOC</option>
            <option>Test</option>
            <option>Quiz</option>
            <option>Practical Work</option>
            <option>Tutorial</option>
            <option>Essay Question</option>

          </select>

        </div>

        {/* FILE */}
        <div className="mb-8">

          <label className="block text-lg font-semibold mb-3">
            Upload Dokumen
          </label>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(
                e.target.files?.[0] || null
              )
            }
            className="w-full border rounded-xl p-4"
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={handleCheck}
          className="
            w-full
            bg-blue-700
            hover:bg-blue-800
            text-white
            text-xl
            font-bold
            py-5
            rounded-2xl
            shadow-lg
            transition
          "
        >
          Semak Tugasan
        </button>

      </div>

    </main>
  );
}