"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function StudentPage() {

  const [program, setProgram] =
    useState("DET");

  const [subjects, setSubjects] =
    useState<any[]>([]);

  const [selectedSubject, setSelectedSubject] =
    useState("");

  const [assessment, setAssessment] =
    useState("EOC");

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [aiResult, setAiResult] =
    useState<any>(null);

  // FETCH SUBJECTS
  useEffect(() => {
    fetchSubjects();
  }, [program]);

  async function fetchSubjects() {

    const { data, error } =
      await supabase
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

  // HANDLE AI CHECK
  async function handleCheck() {

    if (
      !program ||
      !selectedSubject ||
      !assessment ||
      !file
    ) {

      alert(
        "Sila lengkapkan semua maklumat"
      );

      return;
    }

    try {

      setLoading(true);

      const {
        data: assessmentData,
        error: assessmentError,
      } = await supabase
        .from("assessments")
        .select("*")
        .eq(
          "assessment_type",
          assessment
        )
        .limit(1)
        .single();

      if (
        assessmentError ||
        !assessmentData
      ) {

        setLoading(false);

        alert(
          "Rubric tidak dijumpai"
        );

        return;
      }

      const {
        data: rubricFile,
        error: rubricError,
      } = await supabase.storage
        .from("assessment-rubrics")
        .download(
          assessmentData.rubric_file
        );

      if (
        rubricError ||
        !rubricFile
      ) {

        setLoading(false);

        alert(
          "Gagal download rubric"
        );

        return;
      }

      const formData =
        new FormData();

      formData.append(
        "rubric",
        rubricFile
      );

      formData.append(
        "submission",
        file
      );

      const response =
        await fetch(
          "/api/analyze",
          {
            method: "POST",
            body: formData,
          }
        );

      const result =
        await response.json();

      console.log(result);

      if (result.feedback) {

        setAiResult(result);

      } else {

        setLoading(false);

        alert(
          "AI gagal memberi analisa"
        );

      }

    } catch (error) {

      console.log(error);

      setLoading(false);

      alert("Ralat AI Engine");

    }
  }

  return (

    <main className="
      min-h-screen
      bg-slate-100
      flex
      items-center
      justify-center
      p-8
    ">

      <div className="
        w-full
        max-w-4xl
        bg-white
        rounded-[32px]
        shadow-2xl
        p-10
      ">

        <div className="
          text-center
          mb-10
        ">

          <h1 className="
            text-5xl
            font-black
            text-blue-700
          ">
            Student Assessment Portal
          </h1>

          <p className="
            text-gray-500
            mt-4
            text-lg
          ">
            Upload tugasan untuk semakan AI
          </p>

        </div>

        {/* PROGRAM */}
        <div className="mb-6">

          <label className="
            block
            text-lg
            font-semibold
            mb-3
          ">
            Pilih Program
          </label>

          <select
            value={program}
            onChange={(e) =>
              setProgram(e.target.value)
            }
            className="
              w-full
              border
              rounded-xl
              p-4
            "
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

          <label className="
            block
            text-lg
            font-semibold
            mb-3
          ">
            Sila Pilih Kod Kursus
          </label>

          <select
            value={selectedSubject}
            onChange={(e) =>
              setSelectedSubject(
                e.target.value
              )
            }
            className="
              w-full
              border
              rounded-xl
              p-4
            "
          >

            <option value="">
              -- Pilih Subject --
            </option>

            {subjects.map((subject) => (

              <option
                key={subject.id}
                value={subject.id}
              >
                {subject.subject_code}
                {" — "}
                {subject.subject_name}
              </option>

            ))}

          </select>

        </div>

        {/* ASSESSMENT */}
        <div className="mb-6">

          <label className="
            block
            text-lg
            font-semibold
            mb-3
          ">
            Sila Pilih Tugasan
          </label>

          <select
            value={assessment}
            onChange={(e) =>
              setAssessment(
                e.target.value
              )
            }
            className="
              w-full
              border
              rounded-xl
              p-4
            "
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

          <label className="
            block
            text-lg
            font-semibold
            mb-3
          ">
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
            className="
              w-full
              border
              rounded-xl
              p-4
            "
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

      {/* AI RESULT MODAL */}
      {loading && (

        <div className="
          fixed
          inset-0
          bg-black/50
          flex
          items-center
          justify-center
          z-50
        ">

          <div className="
            bg-white
            rounded-3xl
            p-10
            w-full
            max-w-2xl
            shadow-2xl
            text-center
          ">

            {!aiResult ? (

              <>

                <div className="
                  w-20
                  h-20
                  border-4
                  border-blue-500
                  border-t-transparent
                  rounded-full
                  animate-spin
                  mx-auto
                  mb-6
                " />

                <h2 className="
                  text-3xl
                  font-bold
                  text-blue-700
                ">
                  AI Sedang Menganalisa
                </h2>

                <p className="
                  text-gray-500
                  mt-4
                ">
                  Sila tunggu sebentar...
                </p>

              </>

            ) : (

              <>

                <h2 className="
                  text-4xl
                  font-black
                  text-blue-700
                  mb-6
                ">
                  AI Analysis Complete
                </h2>

                <div className="
                  text-6xl
                  font-black
                  text-green-600
                  mb-6
                ">
                  {aiResult.score}%
                </div>

                <div className="
                  bg-slate-100
                  rounded-2xl
                  p-5
                  text-left
                  whitespace-pre-wrap
                  text-sm
                  max-h-[300px]
                  overflow-y-auto
                ">
                  {aiResult.feedback}
                </div>

                <button
                  onClick={() => {

                    setLoading(false);

                    setAiResult(null);

                  }}
                  className="
                    mt-6
                    bg-blue-700
                    hover:bg-blue-800
                    text-white
                    px-8
                    py-3
                    rounded-2xl
                    font-bold
                  "
                >
                  Tutup
                </button>

              </>

            )}

          </div>

        </div>

      )}

    </main>
  );
}