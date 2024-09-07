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
      const cars = [];

      // Using forEach to iterate over each document
      carsSnapshot.forEach((carDoc) => {
        const carData = carDoc.data();
        console.log(carDoc);

        cars.push({
          VIN: carDoc.id, // Document ID used as VIN
          brand: carData.brand, // Extracting brand
          mileage: carData.mileage, // Extracting mileage
          model: carData.model, // Extracting model
          year: carData.year, // Extracting year
        });
      });
      return cars;
    } else {
      console.log("No cars found for this user");
      return null;
    }
  } catch (error) {
    console.error("Error fetching car details:", error);
    return null;
  }
}

function generateSystemPrompt(carDetails) {
  let prompt = `You are a Car Buddy AI assistant designed to help car owners keep their vehicles in optimal condition. `;

  if (carDetails && carDetails.length > 0) {
    prompt += `The user has the following cars associated with their account:\n\n`;

    carDetails.forEach((car, index) => {
      prompt += `${index + 1}. ${car.brand || "Unknown"} ${
        car.model || "Unknown"
      } (${car.year || "Year unknown"})\n`;
    });

    prompt += `\nYour first response should be to list these cars and ask the user which one they want to know more about or get advice for. Once they choose, you can provide more detailed information and advice for that specific car.

After the user selects a car, you will have access to the following details for the chosen car:

VIN: [Will be provided after user selection]
Brand: [Will be provided after user selection]
Model: [Will be provided after user selection]
Year: [Will be provided after user selection]
Current Mileage: [Will be provided after user selection]

Use this information to provide tailored advice when possible. `;
  } else {
    prompt += `The user hasn't provided any car details. Your first response should ask them if they would like to add a car to their profile, and if so, ask for the brand, model, and year of their car. `;
  }

  prompt += `Your responses should:

1. Be specific to the user's chosen car when details are available, or provide general advice if not.
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
    const body = await req.json();
    const data = body.messages;
    console.log("Received data:", JSON.stringify(data));

    // Extract user ID from the request
    const userId = body.userId; // Ensure this is passed from the client

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
