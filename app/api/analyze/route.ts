import { NextResponse } from "next/server";
import pdf from "pdf-parse";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const studentUrl = body.studentUrl;
    const rubricUrl = body.rubricUrl;

    // DOWNLOAD PDF
    const studentPdf = await fetch(studentUrl)
      .then((res) => res.arrayBuffer());

    const rubricPdf = await fetch(rubricUrl)
      .then((res) => res.arrayBuffer());

    // EXTRACT TEXT
    const studentData = await pdf(
      Buffer.from(studentPdf)
    );

    const rubricData = await pdf(
      Buffer.from(rubricPdf)
    );

    const studentText = studentData.text.toLowerCase();
    const rubricText = rubricData.text.toLowerCase();

    // WORD SPLIT
    const studentWords = studentText.split(/\s+/);

    const rubricWords = [
      ...new Set(
        rubricText
          .split(/\s+/)
          .filter((word) => word.length > 4)
      )
    ];

    // MATCH COUNT
    let matchCount = 0;

    rubricWords.forEach((word) => {

      if (
        studentWords.includes(word)
      ) {
        matchCount++;
      }

    });

    // SCORE
    const percentage = Math.floor(
      (matchCount / rubricWords.length) * 100
    );

    return NextResponse.json({
      success: true,
      score: percentage
    });

  } catch (err) {

    console.log(err);

    return NextResponse.json({
      success: false,
      score: 0
    });

  }

}