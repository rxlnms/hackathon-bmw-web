import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an HR AI that analyzes employee performance and gives short insights.",
        },
        {
          role: "user",
          content: `Analyze this employee: ${JSON.stringify(body)}`,
        },
      ],
    });

    return new Response(
      JSON.stringify({
        result: completion.choices[0].message.content,
      }),
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "AI request failed" }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}