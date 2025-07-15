import React from "react";
import Counting from "./Counting";

export default function Count() {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <Counting
        start={10}
        end={100}
        sign={"+"}
        title={"Active Learners"}
      ></Counting>
      <Counting start={10} end={98} sign={"%"} title={"Good Review"}></Counting>
      <Counting
        start={1}
        end={27}
        sign={"+"}
        title={"Popular Teachers"}
      ></Counting>
    </div>
  );
}
