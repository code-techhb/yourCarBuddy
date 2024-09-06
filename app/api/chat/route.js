import { NextResponse } from "next/server";
import OpenAI from "openai";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

//Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to fetch car details from Firebase
async function fetchCarDetails(userId) {
  if (!userId || typeof userId !== "string") {
    console.error("Invalid userId provided:", userId);
    return null;
  }
  try {
    const carsCollection = collection(db, "users", userId, "cars");
    const carsSnapshot = await getDocs(carsCollection);

    if (!carsSnapshot.empty) {
      // Assuming we want to use the first car's details
      const carDoc = carsSnapshot.docs[0];
      const carData = carDoc.data();
      return {
        VIN: carDoc.id,
        brand: carData.brand,
        mileage: carData.mileage,
        model: carData.model,
        year: carData.year,
      };
    } else {
      console.log("No cars found for this user");
      return null;
    }
  } catch (error) {
    console.error("Error fetching car details:", error);
    return null;
  }
}

// Function to generate system prompt based on available car details
function generateSystemPrompt(carDetails) {
  let prompt = `You are a Car Buddy AI assistant designed to help car owners keep their vehicles in optimal condition. `;

  if (carDetails) {
    prompt += `You have access to the following car details:

VIN: ${carDetails.VIN || "Not provided"}
Brand: ${carDetails.brand || "Not provided"}
Model: ${carDetails.model || "Not provided"}
Year: ${carDetails.year || "Not provided"}
Current Mileage: ${carDetails.mileage || "Not provided"}


Use this information to provide tailored advice when possible. `;
  } else {
    prompt += `The user hasn't provided specific car details. `;
  }

  prompt += `Your responses should:

1. Be specific to the user's car when details are available, or provide general advice if not.
2. Provide actionable advice and steps.
3. Recommend professional help for complex issues.
4. Explain technical terms in simple language.
5. Ask for more details about the user's car if needed for specific advice.

Remember to always prioritize safety and encourage regular professional maintenance. If the user hasn't provided car details, feel free to ask for make, model, year, or mileage when it would help provide more accurate advice.

If you need to include an image in your response, use the format: [generate image: description of the image]`;

  return prompt;
}

export async function POST(req) {
  try {
    const data = await req.json();
    console.log("Received data:", JSON.stringify(data));

    // Extract user ID from the request
    const userId = data.userId; // Ensure this is passed from the client

    if (!userId) {
      console.error("No userId provided in the request");
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    // Fetch car details from Firebase
    const carDetails = await fetchCarDetails(userId);

    const systemPrompt = generateSystemPrompt(carDetails);
    const lastMessage = data[data.length - 1];
    const lastMessageContent = lastMessage.content;
    const lastDataWithoutLastMessage = data.slice(0, data.length - 1);

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        ...lastDataWithoutLastMessage,
        { role: "user", content: lastMessageContent },
      ],
      model: "gpt-4",
      stream: true,
    });

    // Stream the response from OpenAI
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              const text = encoder.encode(content);
              controller.enqueue(text);
            }
          }
        } catch (err) {
          console.error("Error in stream processing:", err);
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    // Send result of request back to client
    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
