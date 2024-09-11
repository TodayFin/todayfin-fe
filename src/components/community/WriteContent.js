"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const WriteContent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      setError("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("/api/community/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        router.push("/community");
      } else {
        const data = await response.json();
        setError(data.error || "게시글 등록에 실패했습니다.");
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
          placeholder="제목을 입력하세요."
          value={title}
          onChange={handleTitleChange}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        />
        <textarea
          placeholder="다른 사용자에 대한 욕설, 비하 등의 내용을 게시하면 운영정책 및 관련 법률에 의해 제재될 수 있습니다."
          value={content}
          onChange={handleContentChange}
          className="border border-gray-300 rounded-lg p-2 w-full h-64 whitespace-pre-wrap"
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
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default WriteContent;
