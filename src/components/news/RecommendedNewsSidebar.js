import React from "react";
import Image from 'next/image'

const RecommendedNewsSidebar = ({ recommended }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">추천 뉴스</h2>
      {recommended.map((news, index) => (
        <div key={index} className="mb-4 flex">
          <Image
            src={news.urlToImage}
            alt={news.title}
            className="w-32 h-32 object-cover rounded-lg mr-4"
          />
          <div>
            <h3 className="text-md font-bold mb-1">{news.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendedNewsSidebar;
