import {
  FaLock,
  FaCode,
  FaHeadset,
  FaChalkboardTeacher,
  FaUserGraduate,
} from "react-icons/fa";
import { FiTool } from "react-icons/fi";
import {
  MdAssignmentTurnedIn,
  MdOutlineSecurity,
  MdPayment,
  MdUndo,
} from "react-icons/md";
import {
  AiOutlineLink,
  AiOutlineSchedule,
  AiOutlineThunderbolt,
  AiOutlineWarning,
} from "react-icons/ai";
import { Card, CardContent } from "../ui/card";

const services = [
  {
    icon: <FaChalkboardTeacher size={40} />,
    title: "Expert Teacher Management",
    description:
      "Easily manage and assign qualified teachers to different courses and subjects.",
  },
  {
    icon: <FaUserGraduate size={40} />,
    title: "Student Progress Tracking",
    description:
      "Track learning progress, quiz scores, and course completion rates in real-time.",
  },
  {
    icon: <MdAssignmentTurnedIn size={40} />,
    title: "Assignments & Assessments",
    description:
      "Create, distribute, and evaluate assignments or quizzes with automated scoring.",
  },
  {
    icon: <AiOutlineSchedule size={40} />,
    title: "Course Scheduling & Management",
    description:
      "Set class times, organize modules, and manage course timelines with ease.",
  },
  {
    icon: <MdOutlineSecurity size={40} />,
    title: "Role-Based Secure Access",
    description:
      "Ensure protected access for students, teachers, and admins with role-based control.",
  },
  {
    icon: <FaHeadset size={40} />,
    title: "24/7 Student Support",
    description:
      "Round-the-clock assistance for platform issues, guidance, or learning help.",
  },
];
export default function Features() {
  return (
    <>
      <h1
        id="features"
        className="text-2xl md:text-3xl lg:text-4xl dark:text-white font-bold mb-3 text-center mt-12 lg:mt-14 scroll-mt-24"
      >
        Core Features of <span className="text-blue-500">StudyLi</span>
      </h1>
      <p className=" text-muted-foreground  mb-5 lg:mb-8 text-center lg:w-1/2 mx-auto">
        Studyli is a platform that helps you study smarter and faster. It is a
        platform that helps you study smarter and faster. It is a platform that
        helps you study smarter and faster.
      </p>

      <div className="mt-10">
        <div className="flex flex-wrap justify-center gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow w-full sm:w-[45%] lg:w-[32%] bg-blue-50 hover:bg-blue-100 flex flex-col items-center text-center p-6 gap-4"
            >
              <div className="text-blue-500 my-2">{service.icon}</div>
              <CardContent className="flex flex-col items-center">
                <h3 className="font-semibold text-lg text-blue-500">{service.title}</h3>
                <p className="text-muted-foreground text-sm mt-2">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
