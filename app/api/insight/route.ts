import { error } from "console";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { employee } = await req.json();

        if(!employee) {
            return Response.json(
                { error: "Employee data is required."},
                { status: 400}
            );
        }
        const prompt = `
You are an HR leadership analytics assistant.

Analyze this employee and return a concise, executive-friendly response in exactly this format:

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
            model: "gpt-5.4",
            input: prompt,
        });
        return Response.json({
            text: response.output_text,
        });
    } catch (error) {
        console.error("OpenAI route error:", error);

        return Response.json(
            { error: "Failed to generate insight." },
            { status: 500 }
        );
    }
}