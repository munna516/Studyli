"use client";
import HeroImage from "./HeroImage";
import { Button } from "../ui/button";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="flex flex-col md:flex-row items-center justify-between mt-24 md:mt-24 lg:mt-10"
    >
      {/* Left Side: Text Content */}
      <div className="md:w-1/2 mb-10 md:mb-0">
        <h1 className="text-2xl md:text-3xl lg:text-4xl dark:text-white font-bold mb-4">
          Studyli Make your study
          <span className="ml-3 text-blue-500 font-bold">
            <Typewriter
              words={[
                "Faster",
                "Easier",
                "Better",
                "Simple",
                "Smarter",
                "Efficient",
              ]}
              loop={50}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </h1>
        <p className="text-muted-foreground  mb-6 ">
          Studyli is an online Learning Management System (LMS) designed to
          facilitate digital education through a structured platform for
          students, teachers, and administrators. It enables students to enroll
          in courses, access study materials, and track progress; teachers to
          create and manage courses, assignments, and assessments; and admins to
          oversee user roles and maintain system integrity. Studyli ensures
          secure authentication, role-based access, and a user-friendly
          interface to enhance the overall online learning experience.
        </p>
        <Link href="/login" className="w-full">
          <Button variant="primary">Join Now</Button>
        </Link>
      </div>

      {/* Right Side: Image */}
      <HeroImage />
    </section>
  );
}
