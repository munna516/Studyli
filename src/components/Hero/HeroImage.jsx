"use client";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import heroLottie from "@/../public/assets/lottie/heroLottie.json";

export default function HeroImage() {
  return (
    <div className="md:w-1/2 bg-blue-50 rounded-xl">
      <div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <Lottie animationData={heroLottie} />
      </div>
    </div>
  );
}
