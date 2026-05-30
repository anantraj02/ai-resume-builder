"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [jobRole, setJobRole] = useState("");
  const [skills, setSkills] = useState("");

  const [summary, setSummary] = useState("");
  const [experience, setExperience] = useState("");
  const [projects, setProjects] = useState("");

const [resumes, setResumes] = useState<any[]>([]);
const [selectedResume, setSelectedResume] = useState<any>(null);
const [editingResume, setEditingResume] = useState<any>(null);

const [editSummary, setEditSummary] = useState("");
const [editExperience, setEditExperience] = useState("");
const [editProjects, setEditProjects] = useState("");

  const generateResume = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/ai/generate-resume",
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

    } catch (error) {
      console.log(error);
      alert("Failed to generate resume");
    }
  };

  const saveResume = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/resume/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtcHBxcXlpaDAwMDBiZmJ3eTJrdmtoZzAiLCJpYXQiOjE3Nzk5ODkwMTgsImV4cCI6MTc4MDU5MzgxOH0.1SJRNBORjGhg62e7f9ceubR8cZNbbbHtAXu5r23NjZ8",
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

      console.log(data);

      alert("Resume Saved Successfully");

      fetchResumes();

    } catch (error) {
      console.log(error);
      alert("Failed to save resume");
    }
  };

  const fetchResumes = async () => {
  try {

    const response = await fetch(
      "http://localhost:5000/api/resume/my-resumes",
      {
        headers: {
          authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtcHBxcXlpaDAwMDBiZmJ3eTJrdmtoZzAiLCJpYXQiOjE3Nzk5ODkwMTgsImV4cCI6MTc4MDU5MzgxOH0.1SJRNBORjGhg62e7f9ceubR8cZNbbbHtAXu5r23NjZ8",
        },
      }
    );

    const data = await response.json();

    setResumes(data.resumes || []);

  } catch (error) {
    console.log(error);
    alert("Error in fetchResumes");
  }
};

  useEffect(() => {
  fetchResumes();
}, []);
const deleteResume = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/resume/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtcHBxcXlpaDAwMDBiZmJ3eTJrdmtoZzAiLCJpYXQiOjE3Nzk5ODkwMTgsImV4cCI6MTc4MDU5MzgxOH0.1SJRNBORjGhg62e7f9ceubR8cZNbbbHtAXu5r23NjZ8",
        },
      }
    );

    const data = await response.json();

    alert(data.message);

    fetchResumes();

  } catch (error) {
    console.log(error);
    alert("Failed to delete resume");
  }
};

const updateResume = async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/resume/${editingResume.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtcHBxcXlpaDAwMDBiZmJ3eTJrdmtoZzAiLCJpYXQiOjE3Nzk5ODkwMTgsImV4cCI6MTc4MDU5MzgxOH0.1SJRNBORjGhg62e7f9ceubR8cZNbbbHtAXu5r23NjZ8",
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

    alert(data.message);

    setEditingResume(null);

    fetchResumes();

  } catch (error) {
    console.log(error);
    alert("Update failed");
  }
};
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow">

        <h1 className="text-4xl font-bold mb-8 text-center text-black">
          AI Resume Builder
        </h1>

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

        <div className="flex gap-4">

          <button
            onClick={generateResume}
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Generate AI Resume
          </button>

          {summary && (
            <button
              onClick={saveResume}
              className="bg-green-600 text-white px-6 py-3 rounded"
            >
              Save Resume
            </button>
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