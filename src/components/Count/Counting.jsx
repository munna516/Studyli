"use client";
import CountUp from "react-countup";

const Counting = ({ start, end, sign, title }) => {
  return (
    <div className="flex justify-center items-center">
      <CountUp start={start} end={end} delay={0} duration={3}>
        {({ countUpRef }) => (
          <div className="text-xl">
            <div className="text-3xl font-bold text-blue-500">
              <span ref={countUpRef}>10</span>
              <span>{sign}</span>
            </div>
            <h2 className="text-gray-500">{title}</h2>
          </div>
        )}
      </CountUp>
    </div>
  );
};

export default Counting;
