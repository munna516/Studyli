"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading/Loading";

export default function Announcements() {
  const { data: announcements, isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await fetch("/api/announcement");
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="mt-28 mb-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-500">
        Announcements
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {announcements && announcements.length > 0 ? (
          announcements.map((announcement) => (
            <Card
              key={announcement._id}
              className="flex flex-col h-full shadow-lg border border-gray-200 hover:shadow-xl transition-shadow bg-blue-50"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-blue-700 mb-1">
                  {announcement.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 pb-2">
                <p className="text-gray-700 mb-4 min-h-[60px]">
                  {announcement.description}
                </p>
                <div className="text-sm text-gray-500 text-right mt-4">
                  Post Date :{" "}
                  {announcement.date ? announcement.date.split("T")[0] : ""}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-2 text-center text-gray-400 py-12">
            No announcements found.
          </div>
        )}
      </div>
    </div>
  );
}
