"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SubjectDetailPage() {
  const params = useParams();
  const subjectId = params.id;

  const [subject, setSubject] = useState<any>(null);

  const [assessmentName, setAssessmentName] =
    useState("");

  const [assessmentType, setAssessmentType] =
    useState("EOC");

  const [rubricFile, setRubricFile] =
    useState<File | null>(null);

  const [assessments, setAssessments] =
    useState<any[]>([]);

  useEffect(() => {
    fetchSubject();
    fetchAssessments();
  }, []);

  async function fetchSubject() {
    const { data } = await supabase
      .from("subjects")
      .select("*")
      .eq("id", subjectId)
      .single();

    setSubject(data);
  }

  async function fetchAssessments() {
    const { data } = await supabase
      .from("assessments")
      .select("*")
      .eq("subject_id", subjectId)
      .order("created_at", {
        ascending: false,
      });

    if (data) {
      setAssessments(data);
    }
  }

  async function createAssessment() {
    if (!rubricFile) {
      alert("Sila upload rubric PDF");
      return;
    }

    const fileName = `${Date.now()}-${rubricFile.name}`;

    // UPLOAD RUBRIC
    const { error: uploadError } =
      await supabase.storage
        .from("assessment-rubrics")
        .upload(fileName, rubricFile);

    if (uploadError) {
      alert("Gagal upload rubric");
      return;
    }

    // SAVE DATABASE
    const { error } = await supabase
      .from("assessments")
      .insert([
        {
          subject_id: subjectId,
          assessment_name: assessmentName,
          assessment_type: assessmentType,
          rubric_file: fileName,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Assessment berjaya disimpan!");

    setAssessmentName("");
    setRubricFile(null);

    fetchAssessments();
  }

  async function deleteAssessment(id: string) {
    const confirmDelete = confirm(
      "Padam assessment ini?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("assessments")
      .delete()
      .eq("id", id);

    fetchAssessments();
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-blue-900">
          {subject?.subject_code}
        </h1>

        <p className="text-2xl text-gray-700 mt-2">
          {subject?.subject_name}
        </p>
      </div>

      {/* CREATE ASSESSMENT */}
      <div className="bg-white rounded-3xl shadow-md p-8 mb-10">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">
          Create Assessment
        </h2>

        {/* NAME */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">
            Assessment Name
          </label>

          <input
            type="text"
            value={assessmentName}
            onChange={(e) =>
              setAssessmentName(e.target.value)
            }
            placeholder="Example: EOC Chapter 1"
            className="w-full border rounded-xl p-4"
          />
        </div>

        {/* TYPE */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">
            Assessment Type
          </label>

          <select
            value={assessmentType}
            onChange={(e) =>
              setAssessmentType(e.target.value)
            }
            className="w-full border rounded-xl p-4"
          >
            <option>EOC</option>
            <option>Quiz</option>
            <option>Test</option>
            <option>Tutorial</option>
            <option>Practical Work</option>
            <option>Essay Question</option>
          </select>
        </div>

        {/* FILE */}
        <div className="mb-8">
          <label className="block mb-2 font-semibold">
            Upload Rubric PDF
          </label>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setRubricFile(
                e.target.files?.[0] || null
              )
            }
            className="w-full border rounded-xl p-4"
          />
        </div>

        <button
          onClick={createAssessment}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-2xl transition"
        >
          Save Assessment
        </button>
      </div>

      {/* EXISTING */}
      <div>
        <h2 className="text-3xl font-bold text-blue-900 mb-6">
          Existing Assessments
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {assessments.map((assessment) => (
            <div
              key={assessment.id}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              <h3 className="text-2xl font-bold text-blue-800">
                {assessment.assessment_name}
              </h3>

              <p className="text-gray-600 mt-2">
                {assessment.assessment_type}
              </p>

              <button
                onClick={() =>
                  deleteAssessment(assessment.id)
                }
                className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
              >
                Padam Assessment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}