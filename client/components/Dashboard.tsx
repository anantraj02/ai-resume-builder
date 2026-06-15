"use client";
import jsPDF from "jspdf";
import { useState, useEffect } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Input from "./ui/Input";

export default function Dashboard() {
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
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/resume/my-resumes",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();

      console.log(JSON.stringify(data.resumes, null, 2));

      if (response.ok) {
        const resumeList = data.resumes || [];

        setResumes(resumeList);

        if (resumeList.length > 0) {
          const avgATS =
            resumeList.reduce(
              (sum: any, resume: any) =>
                sum + (resume.atsScore || 0),
              0
            ) / resumeList.length;

          setAtsScore(Math.round(avgATS));
        } else {
          setAtsScore(0);
        }
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  {
    isEditing && (
      <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
        ✏️ Editing Resume Mode
      </div>
    )
  }
  const generateResume = async () => {
    if (!jobRole || !skills) {
      setMessage("Please fill in job role and skills");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/ai/generate-resume",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobRole, skills }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      setSummary(data.summary);
      setExperience(data.experience);
      setProjects(data.projects);
      setAtsScore(data.atsScore || 0);
      setAtsSuggestions(data.atsSuggestions || []);
      setMessage("Resume generated successfully!");
    } catch (error) {
      setMessage("Error generating resume");
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (resume: any) => {
    setEditingId(resume.id);

    setJobRole(resume.title);
    setSkills(resume.skills);
    setSummary(resume.summary);
    setExperience(resume.experience);
    setProjects(resume.projects);

    setIsEditing(true);

    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  };

  const saveResume = async () => {
    console.log("Saving ATS:", atsScore);
    if (!jobRole || !summary) {
      alert("Please generate a resume first");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/resume/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: jobRole,
            summary,
            skills,
            experience,
            education: "",
            projects,
            atsScore,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setMessage("✅ Resume Saved Successfully!");
      setTimeout(() => {
  setMessage("");
}, 4000);

      setJobRole("");
      setSkills("");
      setSummary("");
      setExperience("");
      setProjects("");
      setAtsScore(0);
      fetchResumes();
    } catch (error) {
      alert("Error saving resume");
    }
  };

  const updateResume = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/resume/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: jobRole,
            summary,
            skills,
            experience,
            education: "",
            projects,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setMessage("✅ Resume Updated Successfully!");
      setTimeout(() => {
  setMessage("");
}, 4000);

      setIsEditing(false);
      setEditingId("");

      fetchResumes();

    } catch (error) {
      alert("Error updating resume");
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    if (template === "classic") {
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text(jobRole || "Professional Resume", 20, 20);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`ATS Score: ${atsScore}%`, 20, 30);

      doc.line(20, 35, 190, 35);

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("SUMMARY", 20, 50);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");

      const summaryLines = doc.splitTextToSize(summary || "", 170);
      doc.text(summaryLines, 20, 60);

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
    }

    doc.save(`${jobRole}-resume.pdf`);
  };

  const deleteResume = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/resume/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        alert("Error deleting resume");
        return;
      }

      alert("Resume deleted successfully!");
      fetchResumes();
      setSelectedResume(null);
    } catch (error) {
      alert("Error deleting resume");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-navy mb-2">Resume Dashboard</h1>
          <p className="text-lg text-gray-600">
            Generate, edit, and manage your professional resumes
          </p>
        </div>

        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">

          <h2 className="text-2xl font-bold">
            Welcome Back 👋
          </h2>

          <p className="mt-2 text-blue-100">
            Generate ATS-optimized resumes and land your next job faster.
          </p>

        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <Card hoverable>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">
                  Total Resumes
                </p>

                <h2 className="text-4xl font-bold text-blue-600 mt-2">
                  {resumes.length}
                </h2>
              </div>

              <div className="text-4xl">
                📄
              </div>
            </div>
          </Card>

          <Card hoverable>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">
                  ATS Score
                </p>

                <h2 className="text-4xl font-bold text-green-600 mt-2">
                  {atsScore}%
                </h2>
              </div>

              <div className="text-4xl">
                🎯
              </div>
            </div>
          </Card>
          <Card hoverable>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">
                  Templates
                </p>

                <h2 className="text-4xl font-bold text-purple-600 mt-2">
                  3
                </h2>
              </div>

              <div className="text-4xl">
                🎨
              </div>
            </div>
          </Card>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Generator */}
          <div className="lg:col-span-2 space-y-6">

            

            {/* Input Card */}
            <Card >
              <h2 className="text-2xl font-bold text-navy mb-6">
                Generate Resume
              </h2>
              <div className="space-y-4">
                <Input
                  label="Job Role"
                  placeholder="e.g., Senior Software Engineer"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                />
                <Input
                  label="Skills"
                  placeholder="e.g., React, Node.js, TypeScript, AWS"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />

                {isEditing && (
                  <>
                    <textarea
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder="Summary"
                      className="w-full p-3 border rounded-lg min-h-[120px]"
                    />

                    <textarea
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="Experience"
                      className="w-full p-3 border rounded-lg min-h-[180px]"
                    />

                    <textarea
                      value={projects}
                      onChange={(e) => setProjects(e.target.value)}
                      placeholder="Projects"
                      className="w-full p-3 border rounded-lg min-h-[180px]"
                    />
                  </>
                )}
                {!isEditing && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Template
                    </label>

                    <select
                      value={template}
                      onChange={(e) => setTemplate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200"
                    >
                      <option value="classic">Classic</option>
                      <option value="modern">Modern</option>
                      <option value="ats">ATS-Friendly</option>
                    </select>
                  </div>
                )}

                {/* EDIT MODE BUTTON */}
                {isEditing && (
                  <Button
                    onClick={updateResume}
                    className="
    bg-blue-600
    text-white
    hover:bg-blue-700
    hover:scale-105
    transition-all
    duration-300
    px-6
    py-3
  "
                  >
                    Update Resume
                  </Button>
                )}

                {/* GENERATE BUTTON */}
                {!isEditing && (
                  <Button
                    onClick={generateResume}
                    variant="primary"
                    size="lg"
                    className="
      w-full
      shadow-lg
      hover:shadow-xl
      hover:scale-[1.02]
      transition-all
      duration-300
    "
                    disabled={loading}
                  >
                    {loading
                      ? "⏳ Generating Resume..."
                      : "🚀 Generate with AI"}
                  </Button>
                )}
              </div>
              {message && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700">
                  {message}
                </div>
              )}
            </Card>

            {/* Generated Resume Preview */}
            {summary && (
              <Card >
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Generated Resume
                </h2>

                {/* ATS Score */}
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-navy">
                      ATS Score
                    </span>
                    <div className="text-3xl font-bold text-blue-600">
                      {atsScore}%
                    </div>
                  </div>
                  <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${atsScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Sections */}
                <div className="space-y-6 mb-6">
                  <div>
                    <div className="border rounded-xl p-8 bg-white shadow-sm mb-8">

                      <h1 className="text-3xl font-bold text-center mb-2">
                        {jobRole || "Professional Resume"}
                      </h1>

                      <p className="text-center text-gray-500 mb-6">
                        ATS Score: {atsScore}%
                      </p>

                      <hr className="mb-6" />

                      <h2 className="font-bold text-lg mb-2">
                        SUMMARY
                      </h2>

                      <p className="mb-6">
                        {summary}
                      </p>

                      <h2 className="font-bold text-lg mb-2">
                        EXPERIENCE
                      </h2>

                      <p className="mb-6 whitespace-pre-wrap">
                        {experience}
                      </p>

                      <h2 className="font-bold text-lg mb-2">
                        PROJECTS
                      </h2>

                      <p className="whitespace-pre-wrap">
                        {projects}
                      </p>

                    </div>

                  </div>
                </div>

                {/* ATS Suggestions */}
                {atsSuggestions.length > 0 && (
                  <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h3 className="font-semibold text-amber-900 mb-3">
                      ATS Optimization Tips
                    </h3>
                    <ul className="space-y-2">
                      {atsSuggestions.map((suggestion, idx) => (
                        <li key={idx} className="text-sm text-amber-800 flex items-start">
                          <span className="mr-2">•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 flex-wrap">
                  {!isEditing && (
                    <Button
  onClick={saveResume}
  className="
    bg-blue-600
    text-white
    hover:bg-blue-700
    hover:scale-105
    transition-all
    duration-300
    px-6
    py-3
  "
>
   Save Resume
</Button>
                  )}
                  <Button
                    onClick={downloadPDF}
                    className="
    bg-blue-600
    text-white
    hover:bg-blue-700
    hover:scale-105
    transition-all
    duration-300
    px-6
    py-3
  "
                  >
                    Download PDF
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Right Panel - Saved Resumes */}
          <div>
            <Card >
              <h2 className="text-2xl font-bold text-navy mb-6">
                My Resumes
              </h2>
              <div className="space-y-3">
                {resumes.length === 0 ? (
                  <div className="text-center py-10">

                    <div className="text-5xl mb-4">
                      📄
                    </div>

                    <h3 className="font-semibold text-lg">
                      No Resumes Yet
                    </h3>

                    <p className="text-gray-500 mt-2">
                      Generate and save your first resume
                    </p>

                  </div>
                ) : (
                  resumes.map((resume) => (
                    <div
                      key={resume.id}
                      onClick={() => setSelectedResume(resume)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedResume?.id === resume.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <h3 className="font-semibold text-navy">{resume.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(resume.createdAt).toLocaleDateString()}
                      </p>
                      <div className="flex gap-4 mt-3">

                        <button
                          onClick={() => startEditing(resume)}
                          className="text-blue-500 font-semibold"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteResume(resume.id)}
                          className="text-red-500 font-semibold"
                        >
                          Delete
                        </button>

                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
