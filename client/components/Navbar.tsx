"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import Button from "./ui/Button";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-navy">RF</div>
            <div className="text-lg font-bold text-navy hidden sm:block">
              {APP_NAME}
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
  <Link
    href="/"
    className="text-gray-600 hover:text-blue-600 transition-colors"
  >
    Home
  </Link>

  <Link href="/register">
    <Button variant="outline" size="sm">
      Register
    </Button>
  </Link>

  <Link href="/login">
    <Button variant="primary" size="sm">
      Login
    </Button>
  </Link>
</div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-navy"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-gray-600 hover:text-navy transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-600 hover:text-navy transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className="block px-4 py-2 text-gray-600 hover:text-navy transition-colors"
                >
                  Home
                </Link>
                <Link href="/register" className="block px-4 py-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Register
                  </Button>
                </Link>
                <Link href="/login" className="block px-4 py-2">
                  <Button variant="primary" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
