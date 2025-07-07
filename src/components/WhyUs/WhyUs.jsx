import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import whyChooseUs from "../../../public/assets/image/whyChooseUs.jpg";

export default function WhyUs() {
  const whyUsPoints = [
    {
      title: "Expert Guidance",
      description:
        "Get personalized study plans and strategies from experienced educators and learning specialists.",
    },
    {
      title: "Adaptive Learning",
      description:
        "Our AI-powered platform adapts to your learning style and pace for optimal results.",
    },
    {
      title: "Comprehensive Resources",
      description:
        "Access a vast library of study materials, practice tests, and interactive content.",
    },
    {
      title: "Progress Tracking",
      description:
        "Monitor your learning journey with detailed analytics and performance insights.",
    },
    {
      title: "Community Support",
      description:
        "Connect with fellow learners and share experiences in our supportive community.",
    },
  ];

  return (
    <section className="py-16  ">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Why Choose <span className="text-blue-500">StudyLi</span>?
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transform your learning experience with our innovative platform
          designed to help you succeed
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Image */}
        <div className="order-2 lg:order-1">
          <div className="overflow-hidden  border-0">
            <div className="p-0">
              <Image
                src={whyChooseUs}
                alt="Why Us"
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Bullet Points */}
        <div className="order-1 lg:order-2">
          <div className="space-y-8">
            {whyUsPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-4 group">
                {/* Bullet Point */}
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
