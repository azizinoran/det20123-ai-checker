"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LecturerDashboard() {
  const router = useRouter();

  const [subjects, setSubjects] = useState<any[]>([]);

  useEffect(() => {
    checkUser();
    fetchSubjects();

    const handleFocus = () => {
      fetchSubjects();
    };

    window.addEventListener(
      "focus",
      handleFocus
    );

    return () => {
      window.removeEventListener(
        "focus",
        handleFocus
      );
    };
  }, []);

  async function checkUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/lecturer-login");
    }
  }

  async function fetchSubjects() {
    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (!error && data) {
      setSubjects(data);
    }
  }

  async function deleteSubject(id: string) {
    const confirmDelete = confirm(
      "Padam subject ini?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("subjects")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Gagal padam subject");
      return;
    }

    alert("Subject berjaya dipadam");

    fetchSubjects();
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-5xl font-bold text-blue-900">
            Dashboard Pensyarah
          </h1>

          <p className="text-gray-600 mt-2 text-lg">
            Sistem Semakan Tugasan Pelajar AI
          </p>
        </div>

        <button
          onClick={() =>
            router.push(
              "/lecturer/subjects"
            )
          }
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-4 rounded-2xl shadow-md transition"
        >
          + Create Subject
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-gray-500 text-lg">
            Total Subjects
          </h2>

          <p className="text-4xl font-bold text-blue-800 mt-2">
            {subjects.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-gray-500 text-lg">
            Assessments
          </h2>

          <p className="text-4xl font-bold text-blue-800 mt-2">
            0
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-gray-500 text-lg">
            Student Submissions
          </h2>

          <p className="text-4xl font-bold text-blue-800 mt-2">
            0
          </p>
        </div>
      </div>

      {/* SUBJECT SECTION */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900">
            Your Subjects
          </h2>

          <button
            onClick={() =>
              router.push(
                "/lecturer/subjects"
              )
            }
            className="text-blue-700 font-semibold hover:text-blue-900 transition"
          >
            Manage Subjects →
          </button>
        </div>

        {subjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-2xl">
              No subjects created yet.
            </p>

            <p className="text-gray-400 mt-4">
              Click “Create Subject” to
              begin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="border rounded-2xl p-6 bg-slate-50 hover:shadow-lg transition relative max-w-md"
              >
                {/* BUTTON PADAM */}
                <button
                  onClick={() =>
                    deleteSubject(subject.id)
                  }
                  className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition"
                >
                  Padam
                </button>

                {/* SUBJECT INFO */}
                <h3 className="text-2xl font-bold text-blue-800">
                  {subject.subject_code}
                </h3>

                <p className="text-gray-600 mt-2">
                  {subject.subject_name}
                </p>

                {/* OPEN SUBJECT */}
                <button
                  onClick={() =>
                    router.push(
                      `/lecturer/subjects/${subject.id}`
                    )
                  }
                  className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl transition"
                >
                  Open Subject
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}