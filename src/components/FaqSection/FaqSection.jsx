import FaqImage from "./FaqImage";
import Questions from "./Question";


export default function FaqSection() {
  return (
    <div className="mt-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
        Frequently asked <span className="text-blue-500">Questions</span>
      </h1>
      <div className="">
        <div className="flex items-center justify-center flex-col mb-6"></div>
        <div className="flex flex-col-reverse justify-center items-center md:flex-row gap-7">
          <Questions />
          <FaqImage />
        </div>
      </div>
    </div>
  );
}
 