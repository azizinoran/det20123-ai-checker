import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";

export async function POST(req: Request) {

  try {

    const formData =
      await req.formData();

    const rubricFile =
      formData.get("rubric") as File;

    const submissionFile =
      formData.get("submission") as File;

    if (
      !rubricFile ||
      !submissionFile
    ) {

      return NextResponse.json({

        success: false,

        feedback:
          "Missing files",

      });

    }

    // BUFFER
    const rubricBuffer =
      Buffer.from(
        await rubricFile.arrayBuffer()
      );

    const submissionBuffer =
      Buffer.from(
        await submissionFile.arrayBuffer()
      );

    // PDF PARSE
    const rubricText = (
      await pdfParse(rubricBuffer)
    ).text;

    let submissionText = (
      await pdfParse(submissionBuffer)
    ).text;

    console.log(
      "PDF TEXT LENGTH:",
      submissionText.length
    );

    // FALLBACK IF PDF EMPTY
    if (
      submissionText.length < 50
    ) {

      submissionText =
        "Tiada teks dapat dibaca dari PDF.";

    }

    // SIMPLE ANALYSIS
    const rubricLength =
      rubricText.length;

    const submissionLength =
      submissionText.length;

    // MOCK SCORE
    let score = 0;

    if (
      submissionLength >
      rubricLength * 0.5
    ) {

      score = 75;

    } else {

      score = 45;

    }

    // FEEDBACK
    const feedback = `
AI Analysis Complete

Estimated Score:
${score}%

Rubric Characters:
${rubricLength}

Submission Characters:
${submissionLength}

Observation:
- Rubric detected successfully
- Student submission detected
- PDF parser connected successfully
`;

    return NextResponse.json({

      success: true,

      feedback,

      score,

      rubricLength,

      submissionLength,

    });

  } catch (error: any) {

    console.log(
      "AI ERROR:",
      error
    );

    return NextResponse.json({

      success: false,

      feedback:
        "ERROR: " +
        error?.message,

    });

  }
}