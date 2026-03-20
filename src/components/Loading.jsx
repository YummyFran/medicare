import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

const Loading = () => {
  return (
    <div className="flex justify-center py-[5rem] text-4xl text-gray-400 animate-spin">
      <BiLoaderAlt />
    </div>
  );
};

export default Loading;
