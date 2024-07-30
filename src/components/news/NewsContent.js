import React from 'react';

const NewsContent = ({ imageSrc, content }) => {
  return (
    <div className="mb-8">
      <img src={imageSrc} alt="News" className="w-full h-auto mb-4" />
      <div className="text-lg text-gray-800">
        {content}
      </div>
    </div>
  );
};

export default NewsContent;