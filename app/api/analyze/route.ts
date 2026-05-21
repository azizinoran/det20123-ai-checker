import { NextResponse } from "next/server";
import pdf from "pdf-parse";

function splitQuestions(text: string) {

  const questions: Record<string, string> = {};

  const parts = text.split(/QUESTION\s+\d+/i);

  const matches =
    text.match(/QUESTION\s+\d+/gi);

  if (!matches) return questions;

  matches.forEach((match, index) => {

    questions[match] =
      parts[index + 1] || "";

  });

  return questions;

}

function extractNumbers(text: string) {

  const matches =
    text.match(/\d+(\.\d+)?/g);

  return matches || [];

}

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const studentUrl = body.studentUrl;
    const rubricUrl = body.rubricUrl;

    // DOWNLOAD PDFs
    const studentPdf = await fetch(studentUrl)
      .then((res) => res.arrayBuffer());

    const rubricPdf = await fetch(rubricUrl)
      .then((res) => res.arrayBuffer());

    // RUBRIC TEXT
    const rubricData = await pdf(
      Buffer.from(rubricPdf)
    );

    const rubricText =
      rubricData.text.toLowerCase();

    // STUDENT TEXT
    let studentText = "";

    try {

      const studentData = await pdf(
        Buffer.from(studentPdf)
      );

      studentText =
        studentData.text.toLowerCase();

    } catch {

      console.log("Normal PDF parse failed");

    }

    // OCR SPACE
    if (
      !studentText ||
      studentText.trim().length < 20
    ) {

      console.log("OCR SPACE ACTIVATED");

      const formData = new FormData();

      formData.append(
        "url",
        studentUrl
      );

      formData.append(
        "apikey",
        process.env.OCR_SPACE_API_KEY || ""
      );

      formData.append(
        "language",
        "eng"
      );

      formData.append(
        "isOverlayRequired",
        "false"
      );

      const ocrResponse = await fetch(
        "https://api.ocr.space/parse/image",
        {
          method: "POST",
          body: formData
        }
      );

      const ocrResult =
        await ocrResponse.json();

      studentText =
        ocrResult.ParsedResults?.[0]
          ?.ParsedText?.toLowerCase() || "";

    }

    // SPLIT QUESTIONS
    const rubricQuestions =
      splitQuestions(rubricText);

    const studentQuestions =
      splitQuestions(studentText);

    let totalScore = 0;
    let totalQuestions = 0;

    // LOOP QUESTIONS
    for (const question in rubricQuestions) {

      totalQuestions++;

      const rubricAnswer =
        rubricQuestions[question];

      const studentAnswer =
        studentQuestions[question] || "";

      // WORD MATCH
      const rubricWords = [
        ...new Set(
          rubricAnswer
            .split(/\s+/)
            .filter((word) => word.length > 4)
        )
      ];

      const studentWords =
        studentAnswer.split(/\s+/);

      let wordMatches = 0;

      rubricWords.forEach((word) => {

        const matched =
          studentWords.some(
            (studentWord) =>

              studentWord.includes(word) ||
              word.includes(studentWord)

          );

        if (matched) {
          wordMatches++;
        }

      });

      const wordScore =
        (wordMatches / rubricWords.length) * 70;

      // NUMBER VALIDATION
      const rubricNumbers =
        extractNumbers(rubricAnswer);

      const studentNumbers =
        extractNumbers(studentAnswer);

      let numberMatches = 0;

      rubricNumbers.forEach((num) => {

        if (
          studentNumbers.includes(num)
        ) {
          numberMatches++;
        }

      });

      const numberScore =
        rubricNumbers.length > 0
          ? (numberMatches /
              rubricNumbers.length) *
            30
          : 30;

      // FINAL QUESTION SCORE
      const questionScore =
        wordScore + numberScore;

      totalScore += questionScore;

    }

    // FINAL SCORE
    const finalScore = Math.floor(
      totalScore / totalQuestions
    );

    return NextResponse.json({
      success: true,
      score: finalScore
    });

  } catch (err) {

    console.log(
      "SMART AI ERROR:",
      err
    );

    return NextResponse.json({
      success: false,
      score: 0
    });

  }

}