"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ModifyContent = ({ postId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`/api/community/${postId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });

        if (response.ok) {
          const postData = await response.json();
          setTitle(postData.title);
          setContent(postData.content);
        } else {
          setError("게시글을 불러오는 데 실패했습니다.");
        }
      } catch (err) {
        setError("서버와 통신 중 오류가 발생했습니다.");
      }
    };

    fetchPostData();
  }, [postId]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCancel = () => {
    router.back();
  };

  const handleModify = async () => {
    try {
      const response = await fetch(`/api/community/${postId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        router.push(`/community/${postId}`);
      } else {
        setError("게시글 수정에 실패했습니다.");
      }
    } catch (err) {
      setError("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
        <button onClick={handleCancel} className="text-blue-600">
          <span className="mr-2">←</span>뒤로가기
        </button>
      </div>
      <div className="mb-4">
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        />
        <textarea
          value={content}
          onChange={handleContentChange}
          className="border border-gray-300 rounded-lg p-2 w-full h-64"
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleCancel}
          className="bg-gray-200 text-black px-4 py-2 rounded-lg mr-2"
        >
          취소
        </button>
        <button
          onClick={handleModify}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          수정
        </button>
      </div>
    </div>
  );
};

export default ModifyContent;
