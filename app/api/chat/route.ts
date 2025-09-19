import { type NextRequest, NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

const PERSONALITY_PROMPTS: Record<string, string> = {
  default:
    "You are Jadoo, a helpful and friendly AI assistant. You have a warm, conversational personality and enjoy helping users with a wide variety of tasks. Keep your responses helpful, engaging, and concise.",
  professional:
    "You are Jadoo, a professional AI assistant. Provide clear, concise, and formal responses. Focus on accuracy and efficiency while maintaining a respectful tone.",
  friendly:
    "You are Jadoo, a friendly and enthusiastic AI assistant. Use a casual, upbeat tone and show genuine interest in helping. Feel free to use appropriate humor and be conversational.",
  creative:
    "You are Jadoo, a creative and imaginative AI assistant. Approach problems with creativity and think outside the box. Encourage artistic expression and innovative solutions.",
  analytical:
    "You are Jadoo, an analytical AI assistant. Provide detailed, logical responses with clear reasoning. Break down complex problems step by step and focus on accuracy and thoroughness.",
}

const DEMO_RESPONSES = [
  "I'm currently running in demo mode due to API quota limits. This is a sample response from Jadoo! In full mode, I would provide personalized AI-powered responses to help you with various tasks.",
  "Demo mode active! I'm Jadoo, your AI assistant. While I can't access the full AI model right now due to quota limits, I'm designed to help you with conversations, questions, and tasks when fully operational.",
  "This is a demo response from Jadoo. The OpenAI API quota has been exceeded, but normally I would provide intelligent, contextual responses based on your personality settings and conversation history.",
  "Jadoo here in demo mode! I'd love to help you with real AI-powered responses, but we've hit the API quota limit. Please check your OpenAI billing to restore full functionality.",
]

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] API route called")

    if (!process.env.OPENAI_API_KEY) {
      console.error("[v0] OpenAI API key is missing")
      return NextResponse.json(
        { error: "OpenAI API key is not configured. Please add OPENAI_API_KEY to your environment variables." },
        { status: 500 },
      )
    }

    let requestBody
    try {
      requestBody = await request.json()
      console.log("[v0] Request body parsed successfully")
    } catch (error) {
      console.error("[v0] Failed to parse request body:", error)
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { message, history, personalityMode = "default" } = requestBody

    if (!message) {
      console.error("[v0] Message is missing from request")
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    console.log("[v0] Processing chat request with personality:", personalityMode)

    // Get the appropriate system prompt based on personality mode
    const systemPrompt = PERSONALITY_PROMPTS[personalityMode] || PERSONALITY_PROMPTS.default

    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      {
        role: "system",
        content: systemPrompt,
      },
    ]

    // Add conversation history
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        if (msg.role === "user" || msg.role === "assistant") {
          messages.push({
            role: msg.role,
            content: msg.content,
          })
        }
      }
    }

    // Add the current message
    messages.push({
      role: "user",
      content: message,
    })

    console.log("[v0] Calling OpenAI API with", messages.length, "messages")

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      messages,
      maxOutputTokens: 1000,
      temperature: 0.7,
    })

    console.log("[v0] Successfully generated response")
    return NextResponse.json({ reply: text })
  } catch (error) {
    console.error("[v0] AI SDK error:", error)

    if (error instanceof Error) {
      if (error.message.includes("API key") || error.message.includes("Unauthorized")) {
        return NextResponse.json(
          {
            error:
              "OpenAI API key is invalid or not configured. Please check your OPENAI_API_KEY environment variable.",
          },
          { status: 500 },
        )
      }

      if (error.message.includes("rate limit") || error.message.includes("quota")) {
        const demoResponse = DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)]
        return NextResponse.json(
          {
            reply: demoResponse,
            isDemo: true,
            error:
              "⚠️ OpenAI quota exceeded. Please check your billing at https://platform.openai.com/account/billing to restore full functionality.",
          },
          { status: 200 }, // Return 200 instead of 429 so chat continues working
        )
      }

      // Return the actual error message for debugging
      return NextResponse.json({ error: `API Error: ${error.message}` }, { status: 500 })
    }

    return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 })
  }
}
