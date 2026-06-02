"use client";
import jsPDF from "jspdf";
import { useState, useEffect } from "react";

export default function Home() {
  const [jobRole, setJobRole] = useState("");
  const [skills, setSkills] = useState("");
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState("");
  const [experience, setExperience] = useState("");
  const [projects, setProjects] = useState("");
  const [loading, setLoading] = useState(false);
const [resumes, setResumes] = useState<any[]>([]);
const [selectedResume, setSelectedResume] = useState<any>(null);
const [editingResume, setEditingResume] = useState<any>(null);

const [editSummary, setEditSummary] = useState("");
const [editExperience, setEditExperience] = useState("");
const [editProjects, setEditProjects] = useState("");
const [atsScore, setAtsScore] = useState(0);
const [atsSuggestions, setAtsSuggestions] = useState<string[]>([]);
const [template, setTemplate] = useState("classic");
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  }
}, []);
const downloadPDF = () => {
  const doc = new jsPDF();
  if (template === "classic") {

  // Header
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(jobRole || "Professional Resume", 20, 20);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`ATS Score: ${atsScore}%`, 20, 30);

  // Line
  doc.line(20, 35, 190, 35);

  // Summary
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("SUMMARY", 20, 50);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  const summaryLines = doc.splitTextToSize(
    summary || "",
    170
  );

  doc.text(summaryLines, 20, 60);

  // Experience
  let y = 60 + summaryLines.length * 6 + 10;

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("EXPERIENCE", 20, y);

  y += 10;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  const experienceLines = doc.splitTextToSize(
    experience || "",
    170
  );

  doc.text(experienceLines, 20, y);

  y += experienceLines.length * 6 + 10;

  // Projects
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("PROJECTS", 20, y);

  y += 10;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  const projectLines = doc.splitTextToSize(
    projects || "",
    170
  );

  doc.text(projectLines, 20, y);

  y += projectLines.length * 6 + 10;

  // Skills
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("SKILLS", 20, y);

  y += 10;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(skills, 20, y);
  }
  else if (template === "modern") {

  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");

  doc.text(jobRole || "Professional Resume", 20, 20);

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");

  doc.text(`ATS Score: ${atsScore}%`, 20, 35);

  doc.line(20, 40, 190, 40);

  // SUMMARY
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("PROFESSIONAL SUMMARY", 20, 55);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  const summaryLines =
    doc.splitTextToSize(summary || "", 170);

  doc.text(summaryLines, 20, 65);

  let y = 65 + summaryLines.length * 6 + 15;

  // EXPERIENCE
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("EXPERIENCE", 20, y);

  y += 10;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  const experienceLines =
    doc.splitTextToSize(experience || "", 170);

  doc.text(experienceLines, 20, y);

  y += experienceLines.length * 6 + 15;

  // PROJECTS
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("PROJECTS", 20, y);

  y += 10;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  const projectLines =
    doc.splitTextToSize(projects || "", 170);

  doc.text(projectLines, 20, y);

  y += projectLines.length * 6 + 15;

  // SKILLS
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("SKILLS", 20, y);

  y += 10;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  doc.text(skills || "", 20, y);
}
else if (template === "ats") {

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");

  doc.text(jobRole || "Resume", 20, 20);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  doc.text(
    `ATS Score: ${atsScore}%`,
    20,
    35
  );

  doc.text(
    `Skills: ${skills}`,
    20,
    45
  );

  doc.line(20, 50, 190, 50);

  doc.setFont("helvetica", "bold");
  doc.text("SUMMARY", 20, 65);

  doc.setFont("helvetica", "normal");

  const summaryLines = doc.splitTextToSize(
    summary || "",
    170
  );

  doc.text(summaryLines, 20, 75);

  let y = 75 + summaryLines.length * 6 + 10;

  doc.setFont("helvetica", "bold");
  doc.text("EXPERIENCE", 20, y);

  y += 10;

  doc.setFont("helvetica", "normal");

  const experienceLines = doc.splitTextToSize(
    experience || "",
    170
  );

  doc.text(experienceLines, 20, y);

  y += experienceLines.length * 6 + 10;

  doc.setFont("helvetica", "bold");
  doc.text("PROJECTS", 20, y);

  y += 10;

  doc.setFont("helvetica", "normal");

  const projectLines = doc.splitTextToSize(
    projects || "",
    170
  );

  doc.text(projectLines, 20, y);
}
  doc.save("resume.pdf");
};
  const generateResume = async () => {
  try {

    setLoading(true);

    const response = await fetch(
      "https://ai-resume-builder-w42o.onrender.com/api/resume/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobRole,
          skills,
        }),
      }
    );

    const data = await response.json();

    setSummary(data.summary);
    setExperience(data.experience);
    setProjects(data.projects);
    setAtsScore(data.atsScore);
    setAtsSuggestions(data.atsSuggestions || []);

  } catch (error) {

    console.log(error);
    setMessage("❌ Failed To Generate Resume");

  } finally {

    setLoading(false);

  }
};

  const saveResume = async () => {
    try {
      const response = await fetch(
         "https://ai-resume-builder-w42o.onrender.com/api/resume/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token") || "",
          },
          body: JSON.stringify({
            title: `${jobRole} Resume`,
            summary,
            skills,
            experience,
            education: "B.Tech CSE",
            projects,
          }),
        }
      );

      const data = await response.json();

      //console.log(data);

      setMessage("✅ Resume Saved Successfully");

      fetchResumes();

    } catch (error) {
      console.log(error);
      setMessage("❌ Failed to save resume");
    }
  };

  const fetchResumes = async () => {
  try {

    const response = await fetch(
      "https://ai-resume-builder-w42o.onrender.com/api/resume/my-resumes",
      {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      }
    );

    const data = await response.json();

    setResumes(data.resumes || []);

  } catch (error) {
    console.log(error);
    setMessage("❌ error in fetch resumes");
  }
};

  useEffect(() => {
  fetchResumes();
}, []);
const deleteResume = async (id: string) => {
  try {
    const response = await fetch(
      `https://ai-resume-builder-w42o.onrender.com/api/resume/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization:
           localStorage.getItem("token") || "",
        },
      }
    );

    const data = await response.json();

    setMessage(data.message);

    fetchResumes();

  } catch (error) {
    console.log(error);
    setMessage("❌ Failed to delete resume");
  }
};

const updateResume = async () => {
  try {
    const response = await fetch(
      `https://ai-resume-builder-w42o.onrender.com/api/resume/${editingResume.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization:
           localStorage.getItem("token") || "",
        },
        body: JSON.stringify({
          title: editingResume.title,
          summary: editSummary,
          skills: editingResume.skills,
          experience: editExperience,
          education: editingResume.education,
          projects: editProjects,
        }),
      }
    );

    const data = await response.json();

  setMessage(data.message);

    setEditingResume(null);

    fetchResumes();

  } catch (error) {
    console.log(error);
    setMessage("❌ Failed to update");
  }
};
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow">

        <div className="flex justify-between items-center mb-8">
          
   {message && (
  <div className="mb-4 p-3 rounded bg-green-100 text-green-700">
    {message}
  </div>
)}
  <h1 className="text-4xl font-bold text-black">
    AI Resume Builder
  </h1>

  <button
    onClick={() => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }}
    className="bg-red-600 text-white px-4 py-2 rounded"
  >
    Logout
  </button>

</div>

        <div className="mb-4">
          <label className="block mb-2 text-black">
            Job Role
          </label>

          <input
            type="text"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="w-full border p-3 rounded text-black"
            placeholder="Full Stack Developer"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-black">
            Skills
          </label>

          <textarea
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full border p-3 rounded text-black"
            rows={4}
            placeholder="React, Node.js, Express, PostgreSQL"
          />
        </div>
        <div className="mt-6">
  <label className="block text-lg font-semibold mb-2">
    Resume Template
  </label>

  <select
    value={template}
    onChange={(e) => setTemplate(e.target.value)}
    className="border p-3 rounded w-full"
  >
    <option value="classic">Classic</option>
    <option value="modern">Modern</option>
    <option value="ats">ATS Friendly</option>
  </select>
</div>
        <div className="flex gap-4">

          <button
  onClick={generateResume}
  disabled={loading}
  className={`px-6 py-3 rounded text-white ${
    loading
      ? "bg-gray-500 cursor-not-allowed"
      : "bg-blue-600"
  }`}
>
  {loading
    ? "Generating Resume..."
    : "Generate AI Resume"}
</button>

          {summary && (
  <>
    <button
      onClick={saveResume}
      className="bg-green-600 text-white px-6 py-3 rounded"
    >
      Save Resume
    </button>

    <button
      onClick={downloadPDF}
      className="bg-purple-600 text-white px-6 py-3 rounded"
    >
      Download PDF
    </button>
  </>
)}

        </div>
       <div className="mb-6 p-4 rounded bg-gray-100">

  <h2 className="text-2xl font-bold text-black">
    ATS Score
  </h2>

  <p className="text-xl font-semibold text-green-600">
    {atsScore}%
  </p>

  <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
    <div
      className={`h-4 rounded-full ${
  atsScore >= 90
    ? "bg-green-500"
    : atsScore >= 70
    ? "bg-yellow-500"
    : "bg-red-500"
}`}
      style={{ width: `${atsScore}%` }}
    ></div>
  </div>

  <p
  className={`text-xl font-semibold ${
    atsScore >= 90
      ? "text-green-600"
      : atsScore >= 70
      ? "text-yellow-600"
      : "text-red-600"
  }`}
>
    {atsScore >= 90
      ? "🟢 Excellent Match"
      : atsScore >= 70
      ? "🟡 Good Match"
      : "🔴 Needs Improvement"}
  </p>
{atsSuggestions.length > 0 && (
  <div className="mt-4 p-4 bg-white rounded border">

    <h3 className="text-lg font-bold text-black">
      ATS Suggestions
    </h3>

    <ul className="list-disc ml-6 mt-2 text-black">
      {atsSuggestions.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>

  </div>
)}
</div>
        {summary && (
          
          <div className="mt-10">

            <h2 className="text-2xl font-bold mb-2 text-black">
              Summary
            </h2>

            <p className="mb-6 text-black">
              {summary}
            </p>

            <h2 className="text-2xl font-bold mb-2 text-black">
              Experience
            </h2>

            <p className="mb-6 text-black">
              {experience}
            </p>

            <h2 className="text-2xl font-bold mb-2 text-black">
              Projects
            </h2>

            <p className="text-black">
              {projects}
            </p>

          </div>
        )}

  <div className="mt-12">
  <h2 className="text-3xl font-bold mb-6 text-black">
    My Saved Resumes
  </h2>

  {!resumes || resumes.length === 0 ? (
    <p className="text-gray-500">
      No resumes found
    </p>
  ) : (
    resumes.map((resume: any) => (
  <div
    key={resume.id}
    className="border rounded-lg p-5 mb-4 bg-gray-50"
  >
    <h3 className="text-xl font-bold text-black">
      {resume.title}
    </h3>

    <p className="mt-2 text-black">
      {resume.summary}
    </p>

    <div className="mt-4 flex gap-3">

  <button
    onClick={() => setSelectedResume(resume)}
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    View Details
  </button>

  <button
  onClick={() => {
    setEditingResume(resume);

    setEditSummary(resume.summary);
    setEditExperience(resume.experience);
    setEditProjects(resume.projects);
  }}
  className="bg-yellow-500 text-white px-4 py-2 rounded"
>
  Edit
</button>

  <button
    onClick={() => deleteResume(resume.id)}
    className="bg-red-600 text-white px-4 py-2 rounded"
  >
    Delete
  </button>

</div>
  </div>
))
  )}
</div>
{selectedResume && (
  <div className="mt-12 border rounded-lg p-6 bg-white">

    <h2 className="text-3xl font-bold mb-4 text-black">
      Resume Details
    </h2>

    <h3 className="text-xl font-bold text-black">
      {selectedResume.title}
    </h3>

    <p className="mt-4 text-black">
      <strong>Summary:</strong> {selectedResume.summary}
    </p>

    <p className="mt-4 text-black">
      <strong>Experience:</strong> {selectedResume.experience}
    </p>

    <p className="mt-4 text-black">
      <strong>Projects:</strong> {selectedResume.projects}
    </p>

    <p className="mt-4 text-black">
      <strong>Skills:</strong> {selectedResume.skills}
    </p>

    <p className="mt-4 text-black">
      <strong>Education:</strong> {selectedResume.education}
    </p>

  </div>
)}
{editingResume && (
  <div className="mt-12 border rounded-lg p-6 bg-yellow-50">

    <h2 className="text-3xl font-bold mb-6 text-black">
      Edit Resume
    </h2>

    <textarea
      value={editSummary}
      onChange={(e) => setEditSummary(e.target.value)}
      className="w-full border p-3 rounded mb-4 text-black"
      rows={4}
    />

    <textarea
      value={editExperience}
      onChange={(e) => setEditExperience(e.target.value)}
      className="w-full border p-3 rounded mb-4 text-black"
      rows={5}
    />

    <textarea
      value={editProjects}
      onChange={(e) => setEditProjects(e.target.value)}
      className="w-full border p-3 rounded mb-4 text-black"
      rows={5}
    />

    <button
      onClick={updateResume}
      className="bg-green-600 text-white px-6 py-3 rounded"
    >
      Update Resume
    </button>

  </div>
)}

      </div>
    </div>
  );
}