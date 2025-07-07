"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";

const departments = [
  "Computer Science & Engineering",
  "Electrical & Electronic Engineering",
  "Business Administration",
  "Mechanical Engineering",
  "Texttile Engineering",
  "Civil Engineering",
  "Math",
  "Physics",
  "Chemistry",
  "English",
];

export default function Register() {
  const [isTeacher, setIsTeacher] = useState("No");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    resume: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.phone.length !== 11) {
      setError("Phone number must be 11 digits.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    console.log("This is the form data", form);
    setIsLoading(false);
    // You can add further validation or submission logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-7">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Register to your account
        </h2>
        <form className="space-y-6" onSubmit={handleRegister}>
          {/* First Row */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <Input
                name="fullName"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full h-12"
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full h-12"
              />
            </div>
          </div>
          {/* Second Row */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <Input
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full h-12"
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-2">
                Department
              </label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition bg-white"
                required
              >
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Teacher Option (single row) */}
          <div className="w-full">
            <label className="block text-gray-700 font-medium mb-2">
              Want to register as a Teacher?
            </label>
            <select
              name="isTeacher"
              value={isTeacher}
              onChange={(e) => setIsTeacher(e.target.value)}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition bg-white"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          {/* Resume Link (only if Teacher) */}
          {isTeacher === "Yes" && (
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-2">
                Resume Link
              </label>
              <Input
                name="resume"
                type="url"
                placeholder="Paste your resume link"
                value={form.resume}
                onChange={handleChange}
                required={isTeacher === "Yes"}
                className="w-full h-12"
              />
            </div>
          )}
          {/* Passwords */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full h-12 pr-12"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600 focus:outline-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full h-12 pr-12"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600 focus:outline-none"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-lg mt-4 cursor-pointer"
          >
            {isLoading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Register"
            )}
          </button>
          {error && (
            <p className="text-red-400 font-semibold text-center ">{error}</p>
          )}
          <div className="text-center mt-4">
            <span className="text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline ml-3"
              >
                Login
              </Link>
            </span>
            <span className="text-gray-500 ml-3">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Home
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
