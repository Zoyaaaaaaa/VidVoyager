
// import { NextRequest, NextResponse } from "next/server";
// import { fetchTranscript } from "@/lib/youtube-transcript";
// import { OpenAI } from "openai";

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY as string,
// });

// // Transform transcript data
// function transformData(data: any[]) {
//     let text = "";
//     data.forEach((item) => {
//         text += item.text + " ";
//     });
//     return {
//         data: data,
//         text: text.trim(),
//     };
// }

// // Generate summary or answer based on custom question
// async function generateSummary(link: string, customQuestion: string = "") {
//     try {
//         console.log("Generating text...");

//         // Fetch the transcript
//         const transcript = await fetchTranscript(link);
//         if (!transcript || transcript.length === 0) {
//             throw new Error("No transcript available for this video.");
//         }

//         const transformedData = transformData(transcript);
//         console.log(transformedData);

//         // Create prompt based on custom question or summary
//         const prompt = customQuestion
//             ? `🚀 **Custom Question Answering** 🚀
//                 Based on the video content, please provide a detailed answer to the following question:
                
//                 **Question:** ${customQuestion}
                
//                 ---
                
//                 **Content to Analyze**:
//                 ${transformedData.text}`
//             : `🚀 **YouTube Video Summary** 🚀
                
//                 Follow these steps to create an engaging summary for the provided content and add appropriate emojis to make it more nice and readable:
                
//                 1. **🎯 Title Creation:**
//                    - Craft a title that accurately reflects the video's content and captures viewers' attention.
                
//                 2. **📝 Detailed Summary:**
//                    - Provide a concise summary with 5 key points.
//                    - Use a friendly, conversational tone in the first person.
                
//                 3. **📹 Video Description:**
//                     -Craft a catchy heading and organize the description into clear, informative sections. Integrate relevant keywords and highlight key takeaways to enhance SEO and improve the video's discoverability.
                
//                 ---
                
//                 **Content to Analyze**:
//                 ${transformedData.text}`;

//         // Generate response using OpenAI GPT
//         const response = await openai.chat.completions.create({
//             model: "gpt-4o-mini",
//             messages: [
//                 {
//                     role: "system",
//                     content: "You are a helpful assistant that provides summaries or answers questions based on provided text.",
//                 },
//                 {
//                     role: "user",
//                     content: prompt,
//                 },
//             ],
//             max_tokens: 500, // Adjust as needed
//         });

//         console.log("API Response:", response.choices[0]?.message?.content);

//         if (response.choices[0]?.message?.content) {
//             return response.choices[0].message.content;
//         } else {
//             throw new Error("Invalid response format from the AI API");
//         }
//     } catch (error) {
//         console.error("Error generating text:", error);
//         throw new Error(error instanceof Error ? error.message : "Unknown error");
//     }
// }

// // Handle POST request for generating summary
// export async function POST(req: NextRequest) {
//     try {
//         const body = await req.json();
//         const { videoId, customQuestion } = body;

//         // Validate videoId
//         if (!videoId || typeof videoId !== "string") {
//             return NextResponse.json({ error: "Invalid video ID" }, { status: 400 });
//         }

//         // Generate summary
//         let summary: string;
//         try {
//             summary = await generateSummary(videoId, customQuestion);
//         } catch (error) {
//             console.error("Error processing request:", error);
//             return NextResponse.json(
//                 { error: error instanceof Error ? error.message : "Unknown error" },
//                 { status: 500 }
//             );
//         }

//         return NextResponse.json(
//             { data: summary, error: null },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error("Error parsing request:", error);
//         return NextResponse.json(
//             { error: error instanceof Error ? error.message : "Unknown error" },
//             { status: 400 }
//         );
//     }
// }
import { NextRequest, NextResponse } from "next/server";
import { fetchTranscript } from "@/lib/youtube-transcript";
import { OpenAI } from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string,
});

// Transform transcript data into text format
function transformData(data: any[]): { data: any[], text: string } {
    let text = "";
    data.forEach((item) => {
        text += item.text + " ";
    });
    return {
        data: data,
        text: text.trim(),
    };
}

// Generate summary or answer based on custom question
// async function generateSummary(link: string, customQuestion: string = ""): Promise<string> {
//     try {
//         console.log("Generating text...");

//         // Fetch the transcript
//         const transcript = await fetchTranscript(link);
//         if (!transcript || transcript.length === 0) {
//             throw new Error("No transcript available for this video.");
//         }

//         const transformedData = transformData(transcript);
//         console.log("Transformed Data:", transformedData);

//         // Create prompt based on custom question or summary
//         const prompt = customQuestion
//             ? `🚀 **Custom Question Answering** 🚀
//                 Based on the video content, please provide a detailed answer to the following question:
                
//                 **Question:** ${customQuestion}
                
//                 ---
                
//                 **Content to Analyze**:
//                 ${transformedData.text}`
//             : `🚀 **YouTube Video Summary** 🚀
                
//                 Follow these steps to create an engaging summary for the provided content and add appropriate emojis to make it more nice and readable:
                
//                 1. **🎯 Title Creation:**
//                    - Craft a title that accurately reflects the video's content and captures viewers' attention.
                
//                 2. **📝 Detailed Summary:**
//                    - Provide a concise summary with 5 key points.
//                    - Use a friendly, conversational tone in the first person.
                
//                 3. **📹 Video Description:**
//                     - Craft a catchy heading and organize the description into clear, informative sections. Integrate relevant keywords and highlight key takeaways to enhance SEO and improve the video's discoverability.
                
//                 ---
                
//                 **Content to Analyze**:
//                 ${transformedData.text}`;

//         // Generate response using OpenAI GPT
//         const response = await openai.chat.completions.create({
//             model: "gpt-4o-mini",
//             messages: [
//                 {
//                     role: "system",
//                     content: "You are a helpful assistant that provides summaries or answers questions based on provided text.",
//                 },
//                 {
//                     role: "user",
//                     content: prompt,
//                 },
//             ],
//             max_tokens: 500, // Adjust as needed
//         });

//         console.log("API Response:", response);

//         if (response.choices && response.choices[0]?.message?.content) {
//             return response.choices[0].message.content;
//         } else {
//             throw new Error("Invalid response format from the AI API");
//         }
//     } catch (error) {
//         console.error("Error generating text:", {
//             // message: error.message,
//             // stack: error.stack,
//             // additionalInfo: {
//             //     link,
//             //     customQuestion,
//             // },
//         });
//         throw new Error(error instanceof Error ? error.message : "Unknown error");
//     }
// }
async function generateSummary(link: string, customQuestion: string = ""): Promise<string> {
    try {
        console.log("Fetching transcript...");
        const transcript = await fetchTranscript(link);
        console.log("Transcript data:", transcript);

        if (!transcript || transcript.length === 0) {
            throw new Error("No transcript available for this video.");
        }

        const transformedData = transformData(transcript);
        console.log("Transformed Data:", transformedData);

        // Create and log the prompt
        const prompt = customQuestion
            ? `...` // Custom question prompt
            : `...`; // Summary prompt
        console.log("Prompt:", prompt);

        // Generate response using OpenAI GPT
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant...",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            max_tokens: 500,
        });
        console.log("API Response:", response);

        if (response.choices && response.choices[0]?.message?.content) {
            return response.choices[0].message.content;
        } else {
            throw new Error("Invalid response format from the AI API");
        }
    } catch (error) {
        console.error("Error generating summary:", {
            // message: error.message,
            // stack: error.stack,
            additionalInfo: {
                link,
                customQuestion,
            },
        });
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
}

// Handle POST request for generating summary
export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const body = await req.json();
        const { videoId, customQuestion } = body;

        // Validate videoId
        if (!videoId || typeof videoId !== "string") {
            return NextResponse.json({ error: "Invalid video ID" }, { status: 400 });
        }

        // Generate summary
        let summary: string;
        try {
            summary = await generateSummary(videoId, customQuestion);
        } catch (error) {
            console.error("Error processing request:", {
                // message: error.message,
                // stack: error.stack,
                // additionalInfo: {
                //     videoId,
                //     customQuestion,
                // },
            });
            return NextResponse.json(
                { error: error instanceof Error ? error.message : "Unknown error" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { data: summary, error: null },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error parsing request:", {
            // message: error.message,
            // stack: error.stack,
        });
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Unknown error" },
            { status: 400 }
        );
    }
}
