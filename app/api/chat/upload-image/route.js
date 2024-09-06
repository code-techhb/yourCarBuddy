import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    // Parse incoming form data
    const formData = await req.formData();
    const files = formData.getAll("image"); // Collect all uploaded files

    // Check if there are any image files uploaded
    if (files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    // Process each file and prepare the payload for OpenAI
    const images = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        return {
          type: "image_url",
          image_url: {
            url: `data:${file.type};base64,${buffer.toString("base64")}`,
          },
        };
      })
    );

    try {
      // Send request to OpenAI with images for analysis
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Ensure the model supports image input if available
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze these images and describe any car-related issues or components you see.",
              },
              ...images, // Include all images in the request payload
            ],
          },
        ],
        max_tokens: 300,
      });

      const analysis = response.choices[0].message.content;
      return NextResponse.json({
        message: "Image processed successfully",
        analysis,
      });
    } catch (openaiError) {
      console.error("Error in OpenAI processing:", openaiError);
      return NextResponse.json(
        { error: "Error processing image with OpenAI" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in image upload handler:", error);
    return NextResponse.json(
      { error: "Server error in image processing" },
      { status: 500 }
    );
  }
}
