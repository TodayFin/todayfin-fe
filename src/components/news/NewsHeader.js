import React from 'react';

const NewsHeader = ({ title, source, publishedAt, views }) => {
  return (
    <div className="mb-4">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <div className="text-gray-500 mb-2">
        <span>{source} | </span>
        <span>{new Date(publishedAt).toLocaleString()} | </span>
        <span>조회 {views} | </span>
      </div>
    </div>
  );
};

export default NewsHeader;