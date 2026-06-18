// API configuration
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export const API_BASE_URL =
  `${API_URL}/api`;
export const API_ENDPOINTS = {
  // Auth
  signup: `${API_BASE_URL}/auth/signup`,
  login: `${API_BASE_URL}/auth/login`,
  profile: `${API_BASE_URL}/auth/profile`,

  // Resumes
  createResume: `${API_BASE_URL}/resume/create`,
  getMyResumes: `${API_BASE_URL}/resume/my-resumes`,
  getResume: (id: string) => `${API_BASE_URL}/resume/${id}`,
  updateResume: (id: string) => `${API_BASE_URL}/resume/${id}`,
  deleteResume: (id: string) => `${API_BASE_URL}/resume/${id}`,

  // AI
  generateResume: `${API_BASE_URL}/ai/generate-resume`,
};

export const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});
