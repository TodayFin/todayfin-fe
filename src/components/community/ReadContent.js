"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ReadContent = ({ title, author, views, date, content, authorId }) => {
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/detail", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserId(data._id);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    console.log("수정");
  };

  const handleDelete = () => {
    console.log("삭제");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
        <button onClick={() => router.back()} className="text-blue-600">
          <span className="mr-2">←</span>뒤로가기
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          {userId === authorId && (
            <div>
              <button
                onClick={handleEdit}
                className="text-blue-600 hover:text-blue-800 mr-4"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800"
              >
                삭제
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center mb-4">
          <Image
            src="https://avatars.githubusercontent.com/u/86763857?v=4"
            alt={author}
            className="w-12 h-12 rounded-full mr-4"
            width={48}
            height={48}
          />
          <div>
            <p className="font-bold">{author}</p>
            <p className="text-gray-500">
              조회 {views} | {new Date(date).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="text-gray-700 mb-4 break-all">{content}</div>
      </div>
    </div>
  );
};

export default ReadContent;
