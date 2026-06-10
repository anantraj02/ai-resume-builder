"use client";

import Link from "next/link";
import Card from "./ui/Card";
import Button from "./ui/Button";
import {
  APP_NAME,
  FEATURES,
  HOW_IT_WORKS,
} from "@/lib/constants";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-8 py-14">

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <div>
              <div className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-4 py-2 text-sm font-medium mb-6">
                🚀 AI-Powered Resume Builder
              </div>

              <h1 className="
text-5xl
md:text-6xl
lg:text-6xl
font-extrabold
tracking-tight
text-slate-900
leading-[1.05]
mb-6
">
                Build ATS-Optimized Resumes
                <br />
                <span className="text-blue-600">
                  That Get Interviews
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Create professional resumes with AI assistance, improve ATS
                scores, and stand out to recruiters. Generate job-ready resumes
                in minutes.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/register">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    Create Resume
                  </Button>
                </Link>

                <Link href="/login">
                  <Button className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50">
                    Sign In
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-10 mb-8 max-w-lg">
                <div>
                  <h3 className="text-4xl font-bold text-blue-600">10K+</h3>
                  <p className="text-gray-600">Resumes</p>
                </div>

                <div>
                  <h3 className="text-4xl font-bold text-blue-600">92%</h3>
                  <p className="text-gray-600">ATS Success</p>
                </div>

                <div>
                  <h3 className="text-4xl font-bold text-blue-600">4.9★</h3>
                  <p className="text-gray-600">Rating</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 text-gray-600">
                <span>✓ ATS Friendly</span>
                <span>✓ AI Generated</span>
                <span>✓ PDF Export</span>
                <span>✓ Secure</span>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">

                <span className="px-4 py-2 bg-white border rounded-full text-sm shadow-sm hover:shadow-md transition">
                  ✨ No Credit Card Required
                </span>

                <span className="px-4 py-2 bg-white border rounded-full text-sm shadow-sm hover:shadow-md transition">
                  🚀 Generate Resume in 60 Seconds
                </span>

                <span className="px-4 py-2 bg-white border rounded-full text-sm shadow-sm hover:shadow-md transition">
                  🏆 ATS Score Optimization
                </span>

              </div>

            </div>

            {/* RIGHT */}
            <div>
              <Card
                className="
                max-w-xl
    ml-auto
    p-8
    shadow-2xl
    border
    border-gray-100
    hover:-translate-y-2
    hover:shadow-2xl
    transition-all
    duration-300
    bg-white
  "
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">
                    Resume Analysis
                  </h3>

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                    ATS Score 92%
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Keywords Optimized</span>
                    <span className="text-green-600">✓</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Formatting</span>
                    <span className="text-green-600">✓</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Readability</span>
                    <span className="text-green-600">✓</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Recruiter Friendly</span>
                    <span className="text-green-600">✓</span>
                  </div>
                </div>

                <div className="mt-8 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-[92%] bg-green-500 rounded-full"></div>
                </div>
              </Card>
            </div>

          </div>
        </div>
      </section>

      {/* TRUSTED COMPANIES */}
      <section className="py-8 border-y bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 mb-8 font-medium">
            Trusted by students and professionals from
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 text-3xl md:text-5xl font-bold text-gray-500">
            <span className="opacity-60 hover:opacity-100 transition duration-300">
              Google
            </span>
            <span className="opacity-60 hover:opacity-100 transition duration-300">
              Microsoft
            </span>
            <span className="opacity-60 hover:opacity-100 transition duration-300">
              Amazon
            </span>
            <span className="opacity-60 hover:opacity-100 transition duration-300">
              TCS
            </span>
            <span className="opacity-60 hover:opacity-100 transition duration-300">
              Infosys
            </span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">
              Powerful Features
            </h2>

            <p className="text-xl text-gray-600">
              Everything you need to create an ATS-optimized resume
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, idx) => (
              <Card
                key={idx}
                hoverable
                className="
    border
    border-gray-100
    hover:border-blue-200
    hover:shadow-2xl
    transition-all
    duration-300
  "
              >
                <div className="text-4xl mb-4">{feature.icon}</div>

                <h3 className="text-2xl font-semibold mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            How It Works
          </h2>

          <p className="text-xl text-gray-600">
            Four simple steps to your perfect resume
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {HOW_IT_WORKS.map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-5 text-2xl font-bold">
                {item.step}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">

          <h2 className="text-5xl font-bold text-center mb-4">
            Success Stories
          </h2>

          <p className="text-center text-gray-600 mb-16">
            Loved by students and professionals.
          </p>

          <div className="grid md:grid-cols-3 gap-8">

            <Card className="p-6">
              <p className="text-yellow-500 text-xl mb-4">
                ★★★★★
              </p>

              <p className="text-gray-600">
                Got 3 interview calls within a week after
                optimizing my resume.
              </p>

              <h4 className="font-bold mt-4">
                Rahul Sharma
              </h4>
            </Card>

            <Card className="p-6">
              <p className="text-yellow-500 text-xl mb-4">
                ★★★★★
              </p>

              <p className="text-gray-600">
                ATS score improved from 58% to 91%.
                Amazing experience.
              </p>

              <h4 className="font-bold mt-4">
                Priya Verma
              </h4>
            </Card>

            <Card className="p-6">
              <p className="text-yellow-500 text-xl mb-4">
                ★★★★★
              </p>

              <p className="text-gray-600">
                Built a professional resume in less than
                two minutes.
              </p>

              <h4 className="font-bold mt-4">
                Aditya Singh
              </h4>
            </Card>

          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
  <div className="max-w-4xl mx-auto px-8">

    <h2 className="text-5xl font-bold text-center mb-16">
      Frequently Asked Questions
    </h2>

    <div className="space-y-6">

      <Card className="p-6">
        <h3 className="font-bold mb-2">
          Is ResumeForge AI free?
        </h3>

        <p>
          Yes, you can create resumes for free.
        </p>
      </Card>

      <Card className="p-6">
        <h3 className="font-bold mb-2">
          Is it ATS friendly?
        </h3>

        <p>
          Every resume is optimized for ATS systems.
        </p>
      </Card>

      <Card className="p-6">
        <h3 className="font-bold mb-2">
          Can I export as PDF?
        </h3>

        <p>
          Yes, one-click PDF export is supported.
        </p>
      </Card>

    </div>
  </div>
</section>


      <section className="py-24 bg-blue-600">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Build Your Dream Resume?
          </h2>

          <p className="text-xl text-blue-100 mb-10">
            Join thousands of job seekers using ResumeForge AI to land interviews faster.
          </p>

          <Link href="/register">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Get Started Free
            </Button>
          </Link>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">
            {APP_NAME}
          </h3>

          <div className="space-y-4">

            <p className="text-gray-400">
              AI-powered resume generation for the modern job seeker.
            </p>

            <p className="text-gray-500">
              © 2026 ResumeForge AI. All rights reserved.
            </p>

          </div>
        </div>
      </footer>


      with

      ```tsx
    </div>
  );
}
