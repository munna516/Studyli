"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
    // Here you can add logic to send the email to your backend or a service
  };

  return (
    <div className="rounded-lg  mb-16">
      <h2 className="text-3xl font-bold mb-2 text-center">
        Subscribe to our <span className="text-blue-500">Newsletter</span>
      </h2>
      <p className="mb-4 text-gray-600 text-center">
        Get the latest updates, news, and special offers delivered directly to
        your inbox.
      </p>
      {submitted ? (
        <div className="text-green-600 text-center font-semibold">
          Thank you for subscribing!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-20">
          <input
            type="email"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <Button type="submit" variant="primary">
            Subscribe
          </Button>
        </form>
      )}
    </div>
  );
}
