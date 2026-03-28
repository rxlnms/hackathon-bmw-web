import OpenAI from "openai";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "OPENAI_API_KEY is missing" }),
        { status: 500, headers: corsHeaders }
      );
    }

    const { employee } = await req.json();

    if (!employee) {
      return new Response(
        JSON.stringify({ error: "Employee data is required" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const client = new OpenAI({ apiKey });

    const prompt = `
You are an HR leadership analytics assistant.

Analyze this employee and return a concise response in exactly this format:

Value Summary:
[2-3 sentences]

Recognition Gap:
[1-2 sentences]

Burnout Risk:
[Low / Medium / High + short explanation]

Recommended Actions:
- action 1
- action 2
- action 3

Employee data:
${JSON.stringify(employee, null, 2)}
`;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
    });

    return new Response(
      JSON.stringify({
        text: response.output_text,
      }),
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error: any) {
    console.error("API ERROR:", error);

    return new Response(
      JSON.stringify({
        error: error?.message || "Failed to generate insight.",
      }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}