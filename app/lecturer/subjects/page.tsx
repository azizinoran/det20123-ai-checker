"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");

  async function fetchSubjects() {
    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setSubjects(data);
    }
  }

  async function createSubject() {
    if (!subjectCode || !subjectName) return;

    const { error } = await supabase.from("subjects").insert([
      {
        subject_code: subjectCode,
        subject_name: subjectName,
      },
    ]);

    if (!error) {
      setSubjectCode("");
      setSubjectName("");
      fetchSubjects();
    }
  }

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-4xl font-bold text-blue-900 mb-6">
        Subject Management
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-md mb-8 max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">
          Create Subject
        </h2>

        <input
          type="text"
          placeholder="Subject Code"
          value={subjectCode}
          onChange={(e) => setSubjectCode(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          type="text"
          placeholder="Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <button
          onClick={createSubject}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl w-full"
        >
          Save Subject
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            <h2 className="text-2xl font-bold text-blue-800">
              {subject.subject_code}
            </h2>

            <p className="text-gray-700 mt-2">
              {subject.subject_name}
            </p>

            <button className="mt-6 bg-blue-700 text-white px-4 py-2 rounded-lg w-full">
              Open Subject
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}