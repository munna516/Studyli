import Blogs from "@/components/Blogs/Blogs";
import FaqSection from "@/components/FaqSection/FaqSection";
import FeaturedCourse from "@/components/FeaturedCourse/FeaturedCourse";
import Features from "@/components/Features/Features";
import Hero from "@/components/Hero/Hero";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import WhyUs from "@/components/WhyUs/WhyUs";

export default function Home() {
  return (
    <div className="mt-24 mb-16">
      <Hero />
      <Features />
      <WhyUs />
      <FeaturedCourse />
      <Blogs />
      <FaqSection />
      <NewsLetter />
    </div>
  );
}
