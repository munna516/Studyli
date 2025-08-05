"use client";
import Loading from "@/components/Loading/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdCategory } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FaFilePdf,
  FaVideo,
  FaLink,
  FaPlus,
  FaTrash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CourseDetails() {
  const { data: session } = useSession();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [councilRequestLoading, setCouncilRequestLoading] = useState(false);
  const [councilRequestOpen, setCouncilRequestOpen] = useState(false);
  const [councilRequestData, setCouncilRequestData] = useState({
    subject: "",
    message: "",
  });
  const [approvalData, setApprovalData] = useState({
    meetDate: "",
    meetLink: "",
  });
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [approvalLoading, setApprovalLoading] = useState(false);
  const fileInputRef = useRef(null);
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

  const { data: isEnrolled = true, isLoading: isEnrolledLoading } = useQuery({
    queryKey: ["is_enrolled"],
    queryFn: async () =>
      fetch(
        `/api/courses/is-enrolled?id=${params.id}&studentId=${session?._id}`
      ).then((res) => res.json()),
    enabled: !!session?._id && session?.role === "Student",
  });

  const {
    data: councilRequest,
    isLoading: isCouncilRequestLoading,
    refetch: refetchCouncilRequest,
  } = useQuery({
    queryKey: ["council_request", params.id, session?._id],
    queryFn: async () =>
      fetch(
        `/api/council-request?studentId=${session?._id}&courseId=${params.id}`
      ).then((res) => res.json()),
    enabled: !!session?._id && session?.role === "Student" && !!params.id,
  });

  const {
    data: allCouncilRequests,
    isLoading: isAllCouncilRequestsLoading,
    refetch: refetchAllCouncilRequests,
  } = useQuery({
    queryKey: ["all_council_requests", params.id],
    queryFn: async () => {
      try {
        const response = await fetch(
          `/api/council-request?teacherId=${session?._id}&courseId=${params.id}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        return { requests: [] };
      }
    },
    enabled: !!session?._id && session?.role === "Teacher" && !!params.id,
  });

  if (
    isCourseLoading ||
    isSectionLoading ||
    isEnrolledLoading ||
    isCouncilRequestLoading ||
    isAllCouncilRequestsLoading
  )
    return <Loading />;
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
          name: session?.name,
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

  const handleCouncilRequest = async (e) => {
    e.preventDefault();
    if (
      !councilRequestData.subject.trim() ||
      !councilRequestData.message.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    setCouncilRequestLoading(true);
    try {
      const response = await fetch("/api/council-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: session?._id,
          courseId: params.id,
          subject: councilRequestData.subject,
          message: councilRequestData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          data?.message || "Council request submitted successfully"
        );
        setCouncilRequestOpen(false);
        setCouncilRequestData({ subject: "", message: "" });
        refetchCouncilRequest();
      } else {
        toast.error(data?.message || "Failed to submit council request");
      }
    } catch (error) {
      toast.error("An error occurred while submitting request");
    } finally {
      setCouncilRequestLoading(false);
    }
  };

  const handleApproval = async (e) => {
    e.preventDefault();
    if (!approvalData.meetDate || !approvalData.meetLink.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setApprovalLoading(true);
    try {
      const response = await fetch("/api/council-request", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId: selectedRequestId,
          action: "approve",
          meetDate: approvalData.meetDate,
          meetLink: approvalData.meetLink,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data?.message || "Council request approved successfully");
        setApprovalDialogOpen(false);
        setApprovalData({ meetDate: "", meetLink: "" });
        setSelectedRequestId(null);
        refetchAllCouncilRequests();
      } else {
        toast.error(data?.message || "Failed to approve council request");
      }
    } catch (error) {
      toast.error("An error occurred while approving request");
    } finally {
      setApprovalLoading(false);
    }
  };

  const handleRejection = async (requestId) => {
    try {
      const response = await fetch("/api/council-request", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId,
          action: "reject",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data?.message || "Council request rejected successfully");
        refetchAllCouncilRequests();
      } else {
        toast.error(data?.message || "Failed to reject council request");
      }
    } catch (error) {
      toast.error("An error occurred while rejecting request");
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

  const handleSubmitAssignment = async (assignmentId) => {
    const file = fileInputRef.current?.files[0];
    if (!file) {
      toast.error("Please select a PDF file before submitting.");
      return;
    }
    toast.success("Assignment Submitted Successfully");
    fileInputRef.current.value = "";
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
      {/* Council Request Status for Students */}
      {session?.role === "Student" &&
        isEnrolled &&
        councilRequest?.request?.status === "approved" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FaLink className="text-green-500" />
                Council Meeting Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-semibold text-lg text-green-800">
                    {councilRequest.request.subject}
                  </h3>
                  <p className="text-green-700 mt-2">
                    {councilRequest.request.message}
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm">
                      <span className="font-semibold">Meeting Date:</span>{" "}
                      {new Date(
                        councilRequest.request.meetDate
                      ).toLocaleString()}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Meeting Link:</span>{" "}
                      <a
                        href={councilRequest.request.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Join Meeting
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

      {/* Assignments Section */}
      {sections?.assignments?.length > 0 && isEnrolled && session && (session?.role=="Student" || course?.author?.email === session?.email) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <FaFilePdf className="text-red-500 " />
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
                        name="assignment"
                        accept=".pdf"
                        className="mb-2"
                        placeholder="Upload PDF Assignment"
                        ref={fileInputRef}
                      />
                      <Button
                        onClick={() => handleSubmitAssignment(assignment._id)}
                        variant="primary"
                      >
                        {loading ? "Submitting..." : "Submit Assignment"}
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
      {sections?.meetings?.length > 0 && isEnrolled && session && (session?.role=="Student" || course?.author?.email === session?.email) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
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
      {sections?.tutorials?.length > 0 && isEnrolled && session && (session?.role=="Student" || course?.author?.email === session?.email)&& (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
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

  const renderCouncilRequestsTable = () => {
    
    return (
      <Card className="mt-10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl ">
            <FaLink className="text-orange-500" />
            Council Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          {allCouncilRequests?.requests?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      SL
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Student
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Subject
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Message
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Status
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allCouncilRequests.requests.map((request, index) => (
                    <tr key={request._id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {request.studentId?.name || "Unknown"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {request.subject}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 max-w-xs truncate">
                        {request.message}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            request.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : request.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {request.status === "pending" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 hover:text-green-700"
                              onClick={() => {
                                setSelectedRequestId(request._id);
                                setApprovalDialogOpen(true);
                              }}
                            >
                              <FaCheck />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleRejection(request._id)}
                            >
                              <FaTimes />
                            </Button>
                          </div>
                        )}
                        {request.status === "approved" && (
                          <div className="text-sm text-gray-500">
                            <p>
                              Date:{" "}
                              {new Date(request.meetDate).toLocaleString()}
                            </p>
                            <a
                              href={request.meetLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              Meeting Link
                            </a>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No council requests found
            </p>
          )}
        </CardContent>
      </Card>
    );
  };

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
            {session?.role === "Teacher" && course?.author?.email === session?.email && (
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
            <div className="font-semibold  mb-1">Teacher Info -</div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-medium">{course?.author.name}</div>
                <div className="text-sm ">{course?.author.email}</div>
              </div>
              {session &&
                session?.role === "Teacher" &&
                course?.author?.email === session?.email && (
                  <div>
                    <p className="">
                      Enrollment Key:{" "}
                      <span className="font-bold text-blue-500">
                        {course?.enrollmentKey}
                      </span>
                    </p>
                  </div>
                )}
            </div>
          </div>
          {/* Enrolled Count */}
          <div className="flex items-center justify-between gap-2 mt-1 ">
            <span>
              Total Enrolled:{" "}
              <span className="font-bold text-lg text-blue-500">
                {course?.enrolledStudents.length}
              </span>
            </span>

            {session?.role === "Student" && isEnrolled && (
              <div>
                {councilRequest?.request?.status === "pending" ? (
                  <Button disabled variant="outline">
                    Request Pending
                  </Button>
                ) : (
                  <Dialog
                    open={councilRequestOpen}
                    onOpenChange={setCouncilRequestOpen}
                  >
                    <DialogTrigger asChild>
                      <Button variant="primary">Council Request</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Request for Council</DialogTitle>
                        <DialogDescription>
                          Submit your request for a council meeting. Please
                          provide a subject and detailed message.
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={handleCouncilRequest}
                        className="space-y-4"
                      >
                        <div>
                          <Label htmlFor="subject" className="mb-2">
                            Subject
                          </Label>
                          <Input
                            id="subject"
                            value={councilRequestData.subject}
                            onChange={(e) =>
                              setCouncilRequestData((prev) => ({
                                ...prev,
                                subject: e.target.value,
                              }))
                            }
                            placeholder="Enter subject"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="message" className="mb-2">
                            Message
                          </Label>
                          <Textarea
                            id="message"
                            value={councilRequestData.message}
                            onChange={(e) =>
                              setCouncilRequestData((prev) => ({
                                ...prev,
                                message: e.target.value,
                              }))
                            }
                            placeholder="Enter your message"
                            required
                          />
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            disabled={councilRequestLoading}
                            variant="primary"
                          >
                            {councilRequestLoading
                              ? "Submitting..."
                              : "Submit Request"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            )}
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
        {session?.role === "Teacher" &&
          !isAllCouncilRequestsLoading && course?.author?.email === session?.email &&
          renderCouncilRequestsTable()}
      </div>

      {/* Approval Dialog */}
      <Dialog open={approvalDialogOpen} onOpenChange={setApprovalDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Approve Council Request</DialogTitle>
            <DialogDescription>
              Set the meeting date and link for the council request.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleApproval} className="space-y-4">
            <div>
              <Label htmlFor="meetDate" className="mb-2">
                Meeting Date & Time
              </Label>
              <Input
                id="meetDate"
                type="datetime-local"
                value={approvalData.meetDate}
                onChange={(e) =>
                  setApprovalData((prev) => ({
                    ...prev,
                    meetDate: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="meetLink" className="mb-2">
                Meeting Link
              </Label>
              <Input
                id="meetLink"
                type="url"
                value={approvalData.meetLink}
                onChange={(e) =>
                  setApprovalData((prev) => ({
                    ...prev,
                    meetLink: e.target.value,
                  }))
                }
                placeholder="Enter meeting link"
                required
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={approvalLoading}
                variant="primary"
              >
                {approvalLoading ? "Approving..." : "Approve Request"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
