"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SubjectsPage() {

  const router = useRouter();

  const [subjectCode, setSubjectCode] =
    useState("");

  const [subjectName, setSubjectName] =
    useState("");

  const [semester, setSemester] =
    useState("");

  const [session, setSession] =
    useState("");

  const [subjects, setSubjects] =
    useState<any[]>([]);

  useEffect(() => {

    fetchSubjects();

  }, []);

  async function fetchSubjects() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("subjects")
      .select("*")
      .eq("lecturer_id", user?.id)
      .order("created_at", {
        ascending: false,
      });

    if (data) {

      setSubjects(data);

    }
  }

  async function createSubject() {

    if (
      !subjectCode ||
      !subjectName ||
      !semester ||
      !session
    ) {

      alert(
        "Sila lengkapkan semua maklumat"
      );

      return;

    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("subjects")
      .insert([
        {

          lecturer_id: user?.id,

          subject_code: subjectCode,

          subject_name: subjectName,

          semester: semester,

          session: session,

        },
      ]);

    if (error) {

      alert(error.message);

      return;

    }

    alert(
      "Subject berjaya disimpan!"
    );

    setSubjectCode("");

    setSubjectName("");

    setSemester("");

    setSession("");

    fetchSubjects();
  }

  async function deleteSubject(
    id: string
  ) {

    const confirmDelete = confirm(
      "Padam subject ini?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("subjects")
      .delete()
      .eq("id", id);

    fetchSubjects();
  }

  return (

    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-5xl font-bold text-blue-900 mb-10">
        Subject Management
      </h1>

      {/* CREATE */}
      <div className="bg-white rounded-3xl shadow-md p-8 mb-10">

        <h2 className="text-3xl font-bold mb-8">
          Create Subject
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <input
            type="text"
            placeholder="Subject Code"
            value={subjectCode}
            onChange={(e) =>
              setSubjectCode(
                e.target.value
              )
            }
            className="border rounded-xl p-4"
          />

          <input
            type="text"
            placeholder="Subject Name"
            value={subjectName}
            onChange={(e) =>
              setSubjectName(
                e.target.value
              )
            }
            className="border rounded-xl p-4"
          />

          <input
            type="text"
            placeholder="Semester"
            value={semester}
            onChange={(e) =>
              setSemester(
                e.target.value
              )
            }
            className="border rounded-xl p-4"
          />

          <input
            type="text"
            placeholder="Session"
            value={session}
            onChange={(e) =>
              setSession(
                e.target.value
              )
            }
            className="border rounded-xl p-4"
          />

        </div>

        <button
          onClick={createSubject}
          className="
            mt-8
            w-full
            bg-blue-700
            hover:bg-blue-800
            text-white
            py-4
            rounded-2xl
            transition
          "
        >
          Save Subject
        </button>

      </div>

      {/* SUBJECT LIST */}
      <div>

        <h2 className="text-3xl font-bold text-blue-900 mb-6">
          Existing Subjects
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {subjects.map((subject) => (

            <div
              key={subject.id}
              className="
                bg-white
                rounded-2xl
                shadow-md
                p-6
              "
            >

              <h3 className="text-2xl font-bold text-blue-800">
                {subject.subject_code}
              </h3>

              <p className="text-gray-600 mt-2">
                {subject.subject_name}
              </p>

              <p className="text-gray-500 mt-1">
                Semester {subject.semester}
              </p>

              <button
                onClick={() =>
                  router.push(
                    `/lecturer/subjects/${subject.id}`
                  )
                }
                className="
                  mt-6
                  w-full
                  bg-blue-700
                  hover:bg-blue-800
                  text-white
                  py-3
                  rounded-xl
                  transition
                "
              >
                Open Subject
              </button>

              <button
                onClick={() =>
                  deleteSubject(subject.id)
                }
                className="
                  mt-3
                  w-full
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  py-3
                  rounded-xl
                  transition
                "
              >
                Padam Subject
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}