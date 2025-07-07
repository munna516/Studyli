import Link from "next/link";
import React from "react";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600 text-lg">
            Register as a teacher or student to get started
          </p>
        </div>

        {/* Description */}
        <div className="text-center mb-8">
          <p className="text-gray-500 leading-relaxed">
            Choose your role to access personalized features and resources
            tailored for you.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <Link href="/signup/teacher">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
              Register as Teacher
            </button>
          </Link>
          <Link href="/signup/student">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
              Register as Student
            </button>
          </Link>
        </div>

        {/* Additional info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer hover:underline ml-3"
            >
              Login here
            </a>
            <span className="text-gray-400 ml-3">
              <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer hover:underline">
                Home
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
