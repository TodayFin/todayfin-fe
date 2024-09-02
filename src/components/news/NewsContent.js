import React from "react";
import Image from "next/image";

const NewsContent = ({ imageSrc, content, url }) => {
  return (
    <div className="mb-8">
      <Image
        src={imageSrc}
        alt="News"
        className="w-full h-auto mb-4"
        width={48}
        height={48}
      />{" "}
      <div className="text-lg text-gray-800 mb-4">{content}</div>
      <div className="text-lg text-gray-800">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {url}
        </a>
      </div>
    </div>
  );
};

export default NewsContent;
