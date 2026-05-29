import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateResume = async (req, res) => {
  try {
    const { jobRole, skills } = req.body;

    const prompt = `
Generate professional resume content.

Job Role: ${jobRole}
Skills: ${skills}

Return ONLY valid JSON:

{
  "summary":"",
  "experience":"",
  "projects":""
}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content;

    res.status(200).json({
      aiResponse: content,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "AI Generation Failed",
    });
  }
};