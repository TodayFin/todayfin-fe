import React from "react";
import Image from "next/image";

const NewsContent = ({ imageSrc, content }) => {
  return (
    <div className="mb-8">
      <Image src={imageSrc} alt="News" className="w-full h-auto mb-4" />{" "}
      <div className="text-lg text-gray-800">{content}</div>
    </div>
  );
};

export default NewsContent;
