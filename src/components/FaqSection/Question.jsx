import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const Questions = () => {
  return (
    <div className="w-full ">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value="item-1"
          className=" bg-blue-50  border-2 border-blue-100 px-4 rounded-md mb-4"
        >
          <AccordionTrigger className="text-lg">
            What is this platform about?
          </AccordionTrigger>
          <AccordionContent>
            This is an online learning platform where students can enroll in a
            wide range of courses and learn at their own pace.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-2"
          className=" bg-blue-50  border-2 border-blue-100 px-4 rounded-md mb-4"
        >
          <AccordionTrigger className="text-lg">
            Who can use this platform?
          </AccordionTrigger>
          <AccordionContent>
            Anyone—students, teachers, and education institutions—can use the
            platform to learn, teach, or manage courses.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-3"
          className=" bg-blue-50  border-2 border-blue-100 px-4 rounded-md mb-4"
        >
          <AccordionTrigger className="text-lg">
            Is it free to sign up?
          </AccordionTrigger>
          <AccordionContent>
            Yes, signing up is completely free. Some courses may be free, while
            others are paid.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-4"
          className=" bg-blue-50  border-2 border-blue-100 px-4 rounded-md mb-4"
        >
          <AccordionTrigger className="text-lg">
            How can I become an instructor?
          </AccordionTrigger>
          <AccordionContent>
            While Registering your account select register as a Teacher and give
            your resume link. Our admin team will your porfile and make decision
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-5"
          className=" bg-blue-50  border-2 border-blue-100 px-4 rounded-md mb-4"
        >
          <AccordionTrigger className="text-lg">
            Can I upload my own course content as a teacher?
          </AccordionTrigger>
          <AccordionContent>
            Yes, instructors can upload videos, PDFs, quizzes, and more from
            their dashboard.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-6"
          className=" bg-blue-50  border-2 border-blue-100 px-4 rounded-md mb-4"
        >
          <AccordionTrigger className="text-lg">
            Is my data safe?
          </AccordionTrigger>
          <AccordionContent>
            Yes, we use encryption and secure protocols to protect your personal
            information.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Questions;
