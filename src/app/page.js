import Features from "@/components/Features/Features";
import Hero from "@/components/Hero/Hero";
import WhyUs from "@/components/WhyUs/WhyUs";

export default function Home() {
  return (
    <div className="mt-24 mb-16">
      <Hero />
      <Features />
      <WhyUs />
    </div>
  );
}
