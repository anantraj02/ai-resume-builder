"use client";

import { useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { APP_NAME } from "@/lib/constants";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const registerUser = async () => {
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://ai-resume-builder-w42o.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      registerUser();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center px-6">

        <div className="hidden lg:block">
          <h1 className="text-6xl font-bold text-slate-900 leading-tight mb-6">
            Build ATS-Optimized
            <br />
            Resumes
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Create ATS-optimized resumes in minutes and increase your chances of landing interviews.
          </p>

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

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm mb-4">
              🚀 Trusted by 10,000+ Job Seekers
            </div>

            <div className="text-4xl font-bold text-navy mb-2">
              {APP_NAME}
            </div>

            <p className="text-gray-600">
              Create your account
            </p>

          </div>

          {/* Form */}
          <div className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              autoComplete="name"
            />

            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              autoComplete="new-password"
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              autoComplete="new-password"
            />

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            <Button
              onClick={registerUser}
              variant="primary"
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </div>

          {/* Divider */}
          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Already have an account?</span>
            </div>
          </div>

          {/* Login Link */}
          <Link href="/login">
            <Button
              variant="outline"
              size="lg"
              className="w-full"
            >
              Sign In
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