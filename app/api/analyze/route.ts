import { NextResponse } from "next/server";
import pdf from "pdf-parse";

function splitQuestions(text: string) {

  const questions: Record<string, string> = {};

<<<<<<< HEAD
  const parts = text.split(/QUESTION\s+\d+/i);
=======
  const parts =
    text.split(/QUESTION\s+\d+/i);
>>>>>>> d3a2122bfb652af9c541a65609c70632f3074373

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

<<<<<<< HEAD
=======
function sanitizeText(text: string) {

  return text
    .replace(/[^a-zA-Z0-9\s.=()/+\-]/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();

}

>>>>>>> d3a2122bfb652af9c541a65609c70632f3074373
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

<<<<<<< HEAD
    // RUBRIC TEXT
=======
    // RUBRIC PARSE
>>>>>>> d3a2122bfb652af9c541a65609c70632f3074373
    const rubricData = await pdf(
      Buffer.from(rubricPdf)
    );

<<<<<<< HEAD
    const rubricText =
      rubricData.text.toLowerCase();

    // STUDENT TEXT
=======
    let rubricText =
      rubricData.text || "";

    // STUDENT PARSE
>>>>>>> d3a2122bfb652af9c541a65609c70632f3074373
    let studentText = "";

    try {

      const studentData = await pdf(
        Buffer.from(studentPdf)
      );

      studentText =
<<<<<<< HEAD
        studentData.text.toLowerCase();

    } catch {

      console.log("Normal PDF parse failed");

    }

    // OCR SPACE
=======
        studentData.text || "";

    } catch {

      console.log(
        "Normal PDF parse failed"
      );

    }

    // OCR FALLBACK
>>>>>>> d3a2122bfb652af9c541a65609c70632f3074373
    if (
      !studentText ||
      studentText.trim().length < 20
    ) {

<<<<<<< HEAD
      console.log("OCR SPACE ACTIVATED");
=======
      console.log(
        "OCR SPACE ACTIVATED"
      );
>>>>>>> d3a2122bfb652af9c541a65609c70632f3074373

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
<<<<<<< HEAD
        ocrResult.ParsedResults?.[0]
          ?.ParsedText?.toLowerCase() || "";

    }

=======
        ocrResult
          ?.ParsedResults?.[0]
          ?.ParsedText || "";

    }

    // SANITIZE OCR TEXT
    studentText =
      sanitizeText(studentText);

    rubricText =
      sanitizeText(rubricText);

    console.log("STUDENT:");
    console.log(studentText);

    console.log("RUBRIC:");
    console.log(rubricText);

>>>>>>> d3a2122bfb652af9c541a65609c70632f3074373
    // SPLIT QUESTIONS
    const rubricQuestions =
      splitQuestions(rubricText);

    const studentQuestions =
      splitQuestions(studentText);

    let totalScore = 0;
    let totalQuestions = 0;

<<<<<<< HEAD
    // LOOP QUESTIONS
=======
    // QUESTION LOOP
>>>>>>> d3a2122bfb652af9c541a65609c70632f3074373
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
<<<<<<< HEAD
            .filter((word) => word.length > 4)
=======
            .filter(
              (word) =>
                word.length > 3
            )
>>>>>>> d3a2122bfb652af9c541a65609c70632f3074373
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
<<<<<<< HEAD
        (wordMatches / rubricWords.length) * 70;

      // NUMBER VALIDATION
=======
        rubricWords.length > 0
          ? (
              wordMatches /
              rubricWords.length
            ) * 70
          : 0;

      // NUMBER MATCH
>>>>>>> d3a2122bfb652af9c541a65609c70632f3074373
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
<<<<<<< HEAD
          ? (numberMatches /
              rubricNumbers.length) *
            30
=======
          ? (
              numberMatches /
              rubricNumbers.length
            ) * 30
>>>>>>> d3a2122bfb652af9c541a65609c70632f3074373
          : 30;

      // FINAL QUESTION SCORE
      const questionScore =
        wordScore + numberScore;

      totalScore += questionScore;

    }

<<<<<<< HEAD
    // FINAL SCORE
    const finalScore = Math.floor(
      totalScore / totalQuestions
    );
=======
    // AVOID DIVIDE ZERO
    const finalScore =
      totalQuestions > 0
        ? Math.floor(
            totalScore /
            totalQuestions
          )
        : 0;
>>>>>>> d3a2122bfb652af9c541a65609c70632f3074373

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