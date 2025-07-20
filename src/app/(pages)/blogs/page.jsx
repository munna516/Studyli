"use client";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading/Loading";

export default function Blogs() {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) return <Loading />;


  return (
    <div className="mt-28 mb-16">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-500">
        Blogs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Card
              key={blog._id}
              className="flex flex-col h-full shadow-lg border border-gray-200 hover:shadow-xl px-2 transition-shadow bg-blue-50 pb-0"
            >
              {/* Row 1: Image */}
              <div className="relative  h-52 pt-0 ">
                <Image
                  src={blog.thumbnail}
                  alt={blog.title}
                  fill
                  className=" rounded-xl"
                  priority={true}
                />
              </div>
              {/* Row 2: Title */}
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-blue-700 mb-1">
                  {blog.title}
                </CardTitle>
              </CardHeader>
              {/* Row 3: Description */}
              <CardContent className="flex-1 pb-2">
                <p className="text-gray-700 mb-4 min-h-[60px]">
                  {blog.description}
                </p>
                {/* Row 4: Post Date (right-aligned) */}
                <div className="text-sm text-gray-500 text-right mt-4">
                  Post Date : {blog.date ? blog.date.split("06:00:00")[0] : ""}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-2 text-center text-gray-400 py-12">
            No blogs found.
          </div>
        )}
      </div>
    </div>
  );
}
