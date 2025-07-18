import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const blogs = [
  {
    id: 1,
    title: "The Future of Online Learning",
    description:
      "Explore how technology is transforming education and what the future holds for online learning platforms.",
    date: "2024-06-01",
    thumbnail: "/assets/image/whyChooseUs.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "Effective Study Habits for Students",
    description:
      "Discover proven study techniques to boost retention and academic performance for learners of all ages.",
    date: "2024-05-28",
    thumbnail: "/assets/image/logo.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Blended Learning: Pros and Cons",
    description:
      "A deep dive into the advantages and challenges of combining traditional and digital education methods.",
    date: "2024-05-20",
    thumbnail: "/assets/image/whyChooseUs.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "How to Choose the Right Course Online",
    description:
      "Tips and tricks for selecting the best online courses to match your career goals and interests.",
    date: "2024-05-15",
    thumbnail: "/assets/image/logo.jpg",
    link: "#",
  },
  {
    id: 5,
    title: "The Role of AI in Modern Classrooms",
    description:
      "Understand how artificial intelligence is reshaping the way teachers teach and students learn.",
    date: "2024-05-10",
    thumbnail: "/assets/image/whyChooseUs.jpg",
    link: "#",
  },
  {
    id: 6,
    title: "Building a Growth Mindset in Education",
    description:
      "Learn strategies to foster a growth mindset for lifelong learning and personal development.",
    date: "2024-05-01",
    thumbnail: "/assets/image/logo.jpg",
    link: "#",
  },
];

export default function Blogs() {
  return (
    <div className="mt-32 mb-16">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-500">Education Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Card key={blog.id} className="flex flex-col h-full bg-green-50 hover:shadow-lg transition-shadow duration-300">
            {/* Row 1: Image */}
            <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={blog.id === 1}
              />
            </div>
            {/* Row 2: Title */}
            <CardHeader className="px-4 pt-4 pb-0">
              <CardTitle className="text-lg text-center">{blog.title}</CardTitle>
            </CardHeader>
            {/* Row 3: Description */}
            <CardContent className="px-4 pt-2 pb-0">
              <CardDescription className="text-center">
                {blog.description}
              </CardDescription>
            </CardContent>
            {/* Row 4: Post date and Read more button */}
            <CardFooter className="flex justify-between items-center mt-auto px-4 pt-4 pb-4">
              <span className="text-xs text-gray-500">{blog.date}</span>
              <Button asChild size="sm">
                <a href={blog.link}>Read more</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
