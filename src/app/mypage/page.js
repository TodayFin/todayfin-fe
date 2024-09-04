"use client";

import { useState, useEffect } from "react";

const MyPage = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/detail", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });

        if (!response.ok) {
          throw new Error("사용자 정보를 가져오는데 실패했습니다.");
        }

        const data = await response.json();
        setEmail(data.oauthId);
        setNickname(data.nickname);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 현재 비밀번호 확인
      const loginResponse = await fetch("/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oauthId: email,
          password: currentPassword,
        }),
      });

      if (!loginResponse.ok) {
        throw new Error("현재 비밀번호가 올바르지 않습니다.");
      }

      // 비밀번호 변경 API 호출
      const updatePasswordResponse = await fetch("/api/user/detail", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      });

      if (!updatePasswordResponse.ok) {
        throw new Error("비밀번호 변경에 실패했습니다.");
      }

      alert("비밀번호가 성공적으로 변경되었습니다.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 pt-16 pb-16">
      <div className="w-full h-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">마이페이지</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 focus:outline-none"
              value={email}
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="nickname"
              className="block text-gray-700 font-semibold mb-2"
            >
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 focus:outline-none"
              value={nickname}
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="currentPassword"
              className="block text-gray-700 font-semibold mb-2"
            >
              현재 비밀번호
            </label>
            <input
              type="password"
              id="currentPassword"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-gray-700 font-semibold mb-2"
            >
              새 비밀번호
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmNewPassword"
              className="block text-gray-700 font-semibold mb-2"
            >
              새 비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            비밀번호 수정
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyPage;
