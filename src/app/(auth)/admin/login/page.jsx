"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { TbFidgetSpinner } from "react-icons/tb";
import { useRouter } from "next/navigation";

export default function Login() {
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      setIsLoading(true);
      const response = await signIn("credentials", {
        email,
        password,
        role: "Admin",
        redirect: false,
      });
      if (response?.error) {
        toast.error("Invalid credentials");
      } else {
        toast.success("Admin Login successful");
        router.push("/admin/dashboard");
      }
    } catch (error) {
      toast.error("Internal server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-2">
          Admin Login
        </h2>
        <p className="text-center text-gray-400 mb-6">
          This route is only for admin.Please use admin credentials to login.
        </p>
        <form className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition pr-12"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600 focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            onClick={(e) => handleLogin(e)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
          >
            {isLoading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="text-right text-gray-500 mt-4">
          <span className="text-gray-400 ml-3">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer hover:underline"
            >
              Home
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
