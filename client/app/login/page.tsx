"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { APP_NAME } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    router.push("/dashboard");
  }
}, [router]);

  const loginUser = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
     const response = await fetch(
  `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }
localStorage.setItem("token", data.token);
window.location.href = "/dashboard";
      
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      loginUser();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center">

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center px-6">
        <div className="hidden lg:block">

          <h1 className="text-6xl font-bold text-slate-900 leading-tight mb-6">
            Sign in to continue 
            <br />
            building your resume
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Access your resumes, ATS reports, and continue building your dream career.
          </p>

          <h3 className="font-semibold text-slate-900 mb-4">
            Why Choose ResumeForge AI?
          </h3>

          <div className="space-y-4 text-lg">
            <div>🚀 ATS Score Optimization</div>
            <div>🤖 AI Resume Generation</div>
            <div>🎨 Professional Templates</div>
            <div>📄 Instant PDF Export</div>
          </div>

        </div>
        <Card className="w-full max-w-lg p-8 shadow-2xl hover:-translate-y-1 transition-all duration-300 justify-self-center">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-navy mb-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm mb-4">
                🚀 Trusted by 10,000+ Job Seekers
              </div>
              {APP_NAME}
            </div>
            <p className="text-gray-600">Welcome back</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              autoComplete="email"
              error={error && error.includes("email") ? error : ""}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              autoComplete="current-password"
              error={error && error.includes("password") ? error : ""}
            />

            {error && !error.includes("email") && !error.includes("password") && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            <Button
              onClick={loginUser}
              variant="primary"
              size="lg"
             className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </div>

          {/* Divider */}
          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">New to ResumeForge?</span>
            </div>
          </div>

          {/* Register Link */}
          <Link href="/register">
            <Button
              variant="outline"
              size="lg"
              className="w-full"
            >
              Create an Account
            </Button>
          </Link>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-blue-600 hover:text-blue-700">
              Back to Home
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}