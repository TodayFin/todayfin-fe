"use client";
import { useRouter } from "next/navigation";

const ReadContent = ({ title, author, views, date, content }) => {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
        <button onClick={() => router.back()} className="text-blue-600">
          <span className="mr-2">←</span>뒤로가기
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <div className="flex items-center mb-4">
          <img
            src="https://avatars.githubusercontent.com/u/86763857?v=4"
            alt={author}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="font-bold">{author}</p>
            <p className="text-gray-500">
              조회 {views} | {new Date(date).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="text-gray-700 mb-4">{content}</div>
      </div>
    </div>
  );
};

export default ReadContent;
