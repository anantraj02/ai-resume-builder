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

Also:

1. Analyze the resume.
2. Give an ATS score out of 100.
3. Give 3 ATS improvement suggestions.

ATS score should be realistic and usually between 65 and 95.
Do not always return 100.

Return ONLY valid JSON:

{
  "summary":"",
  "experience":"",
  "projects":"",
  "atsScore":0,
  "atsSuggestions":[]
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

    const cleanedContent = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const resumeData = JSON.parse(cleanedContent);
   
    resumeData.atsScore =
  Number(resumeData.atsScore) || 75;

    res.status(200).json(resumeData);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "AI Generation Failed",
    });
  }
};