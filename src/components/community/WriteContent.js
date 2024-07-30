"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const WriteContent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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

  const handleSubmit = () => {
    router.push("/community");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
        <button onClick={() => router.back()} className="text-blue-600">
          <span className="mr-2">←</span>뒤로가기
        </button>
      </div>
      <div className="mb-4">
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