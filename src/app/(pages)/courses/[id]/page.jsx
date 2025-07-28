"use client";
import Loading from "@/components/Loading/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdCategory } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaFilePdf, FaVideo, FaLink, FaPlus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

export default function CourseDetails() {
  const { data: session } = useSession();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newSection, setNewSection] = useState({
    type: "assignment",
    title: "",
    description: "",
    dueDate: "",
    link: "",
  });
  const params = useParams();
  const {
    data: course,
    isLoading: isCourseLoading,
    refetch,
  } = useQuery({
    queryKey: ["course_details"],
    queryFn: async () =>
      fetch(`/api/course-details?id=${params.id}`).then((res) => res.json()),
  });

  const {
    data: sections,
    isLoading: isSectionLoading,
    refetch: refetchSections,
  } = useQuery({
    queryKey: ["course_sections", params.id],
    queryFn: async () =>
      fetch(`/api/courses/add-section?id=${params.id}`).then((res) =>
        res.json()
      ),
    enabled: !!params.id,
  });

  if (isCourseLoading || isSectionLoading) return <Loading />;

  const handleEnroll = async (e) => {
    e.preventDefault();
    const enrollmentKey = e.target.key.value;
    if (!enrollmentKey.trim()) {
      toast.error("Please enter an enrollment key");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/courses/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: course._id,
          studentId: session?._id,
          email: session?.email,
          enrollmentKey: enrollmentKey,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data?.message || "Successfully enrolled in course");
        refetch();
      } else {
        toast.error(data?.message || "Failed to enroll in course");
      }
    } catch (error) {
      toast.error("An error occurred while enrolling");
    } finally {
      e.target.key.value = "";
      setLoading(false);
    }
  };

  const handleAddSection = async (e) => {
    e.preventDefault();
    if (!newSection.title.trim() || !newSection.description.trim()) {
      toast.error("Please enter a title and description");
      return;
    }
    try {
      const response = await fetch("/api/courses/add-section", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: course?._id,
          section: newSection,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data?.message || "Section added successfully");
        refetchSections();
      } else {
        toast.error(data?.message || "Failed to add section");
      }
    } catch (error) {
      toast.error("Failed to add section");
    } finally {
      setNewSection({
        type: "assignment",
        title: "",
        description: "",
        dueDate: "",
        link: "",
      });
    }
  };

  const handleDeleteSection = async (type, id) => {
    try {
      Swal.fire({
        title: "Are you sure to delete this?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await fetch("/api/courses/add-section", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              courseId: course?._id,
              sectionId: id,
              type,
            }),
          });
          const data = await response.json();
          if (response.ok) {
            toast.success(data?.message || "Section deleted successfully");
            refetchSections();
          } else {
            toast.error(data?.message || "Failed to delete section");
          }
        }
      });
    } catch (error) {
      toast.error("Failed to delete section");
    }
  };

  const renderSectionForm = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaPlus className="text-blue-500 text-2xl" />
          Add New Section
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddSection} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type" className="mb-2">
                Section Type
              </Label>
              <select
                id="type"
                value={newSection.type}
                onChange={(e) =>
                  setNewSection((prev) => ({ ...prev, type: e.target.value }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="assignment">Assignment</option>
                <option value="meeting">Meeting Link</option>
                <option value="tutorial">Tutorial Video</option>
              </select>
            </div>
            <div>
              <Label htmlFor="title" className="mb-2">
                Title
              </Label>
              <Input
                id="title"
                value={newSection.title}
                onChange={(e) =>
                  setNewSection((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder={`Enter ${newSection.type} title`}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="mb-2">
              Description
            </Label>
            <Textarea
              id="description"
              value={newSection.description}
              onChange={(e) =>
                setNewSection((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder={`Enter ${newSection.type} description`}
            />
          </div>

          {newSection.type === "assignment" && (
            <div>
              <Label htmlFor="dueDate" className="mb-2">
                Due Date
              </Label>
              <Input
                id="dueDate"
                type="datetime-local"
                value={newSection.dueDate}
                onChange={(e) =>
                  setNewSection((prev) => ({
                    ...prev,
                    dueDate: e.target.value,
                  }))
                }
              />
            </div>
          )}

          {(newSection.type === "meeting" ||
            newSection.type === "tutorial") && (
            <div>
              <Label htmlFor="link" className="mb-2">
                Link
              </Label>
              <Input
                id="link"
                type="url"
                value={newSection.link}
                onChange={(e) =>
                  setNewSection((prev) => ({ ...prev, link: e.target.value }))
                }
                placeholder={`Enter ${newSection.type} link`}
              />
            </div>
          )}

          <Button variant="primary">Add Section</Button>
        </form>
      </CardContent>
    </Card>
  );

  const renderSections = () => (
    <div className="space-y-6">
      {/* Assignments Section */}
      {sections?.assignments?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaFilePdf className="text-red-500" />
              Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sections.assignments.map((assignment) => (
                <div
                  key={assignment._id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {assignment.title}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {assignment.description}
                      </p>
                      {assignment.dueDate && (
                        <p className="text-sm text-red-500 mt-2">
                          Due: {new Date(assignment.dueDate).toLocaleString()}
                        </p>
                      )}
                    </div>
                    {editMode && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          handleDeleteSection("assignments", assignment._id)
                        }
                      >
                        <FaTrash />
                      </Button>
                    )}
                  </div>
                  {session?.role === "Student" && (
                    <div className="mt-4">
                      <Input
                        type="file"
                        accept=".pdf"
                        className="mb-2"
                        placeholder="Upload PDF Assignment"
                      />
                      <Button className="bg-green-500 hover:bg-green-600">
                        Submit Assignment
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Meeting Links Section */}
      {sections?.meetings?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaLink className="text-blue-500" />
              Meeting Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sections.meetings.map((meeting) => (
                <div
                  key={meeting._id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{meeting.title}</h3>
                      <p className="text-gray-600 mt-1">
                        {meeting.description}
                      </p>
                      <a
                        href={meeting.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline mt-2 inline-block"
                      >
                        Join Meeting
                      </a>
                    </div>
                    {editMode && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          handleDeleteSection("meetings", meeting._id)
                        }
                      >
                        <FaTrash />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tutorial Videos Section */}
      {sections?.tutorials?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaVideo className="text-purple-500" />
              Tutorial Videos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sections.tutorials.map((tutorial) => (
                <div
                  key={tutorial._id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {tutorial.title}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {tutorial.description}
                      </p>
                      <a
                        href={tutorial.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-500 hover:underline mt-2 inline-block"
                      >
                        Watch Tutorial
                      </a>
                    </div>
                    {editMode && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          handleDeleteSection("tutorials", tutorial._id)
                        }
                      >
                        <FaTrash />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <div className="mt-28 mb-20">
      <div className="w-full  bg-white border border-gray-200 rounded-lg shadow-lg md:flex overflow-hidden relative">
        {/* Thumbnail */}
        <div className="md:w-1/2 flex items-center justify-center p-2">
          <Image
            src={course?.thumbnail}
            alt="Course Thumbnail"
            width={500}
            height={500}
            className=" w-full h-full max-h-70 rounded-2xl"
          />
        </div>
        {/* Right Side */}
        <div className="md:w-1/2  p-6 flex flex-col gap-4 relative">
          {/* Top Row: Title & Edit Toggle */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{course?.title}</h1>
            {session?.role === "Teacher" && (
              <button
                className={`ml-4 px-3 py-1 rounded-full border ${
                  editMode
                    ? "bg-blue-500 text-white cursor-pointer font-semibold border-2 border-blue-300"
                    : "bg-white text-blue-500 cursor-pointer border-2 border-blue-300 hover:bg-blue-500 hover:text-white font-semibold"
                }`}
                onClick={() => setEditMode((prev) => !prev)}
                title="Toggle Edit Mode"
              >
                {editMode ? "Editing" : "Enable Edit Mode"}
              </button>
            )}
          </div>
          {/* Description */}
          <div>
            <p className="text-gray-700">{course?.description}</p>

            <p className="text-gray-700 mt-3 flex items-center gap-2">
              <span className="text-blue-500">
                <MdCategory />
              </span>{" "}
              {course?.category} - {course?.level}
            </p>
          </div>
          {/* Teacher Info */}
          <div>
            <div className="font-semibold mb-1">Teacher Info -</div>
            <div className="flex items-center gap-3">
              <div>
                <div className="font-medium">{course?.author.name}</div>
                <div className="text-sm ">{course?.author.email}</div>
              </div>
            </div>
          </div>
          {/* Enrolled Count */}
          <div className="flex items-center gap-2 mt-2 ">
            <span>Total Enrolled:</span>
            <span className="font-bold text-lg text-blue-500">
              {course?.enrolledStudents.length}
            </span>
          </div>
        </div>
      </div>

      {session?.role === "Student" &&
        !course?.enrolledStudents
          .map((student) => student.studentId)
          .includes(session._id) && (
          <div className="mt-16">
            <h1 className="text-2xl font-bold mb-8 text-center text-red-500">
              You Do not have Access to this course . To access this course
              please enter the enrollment key
            </h1>
            <form
              onSubmit={(e) => handleEnroll(e)}
              className="flex items-center justify-center gap-10"
            >
              <Input
                type="text"
                name="key"
                placeholder="Enter Enrollment Key"
                className="w-80 border-blue-500"
              />
              <Button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                {loading ? "Enrolling..." : "Enroll Now"}
              </Button>
            </form>
          </div>
        )}

      <div className="mt-20">
        {editMode && session?.role === "Teacher" && renderSectionForm()}
        {renderSections()}
      </div>
    </div>
  );
}
