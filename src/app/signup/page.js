"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const categories = ["경제", "생명과학", "제조", "부동산", "유통", "기술"];

const categoryMap = {
  전체: null,
  경제: "finance",
  생명과학: "life_sciences",
  제조: "manufacturing",
  부동산: "real_estate",
  유통: "retail_wholesale",
  기술: "technology",
};

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (selectedCategories.length !== 3) {
      setError("관심있는 카테고리를 3개 선택해주세요.");
      return;
    }

    try {
      // 회원가입 API 호출
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oauthProvider: "local",
          oauthId: email,
          password,
          nickname,
          name,
          category: selectedCategories,
        }),
      });

      if (!response.ok) {
        throw new Error("회원가입에 실패했습니다. 다시 시도해 주세요.");
      }

      alert("회원가입이 성공적으로 완료되었습니다!");

      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCategoryClick = (category) => {
    if (selectedCategories.includes(categoryMap[category])) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== categoryMap[category])
      );
    } else if (selectedCategories.length < 3) {
      setSelectedCategories([...selectedCategories, categoryMap[category]]);
    } else {
      setError("3개의 카테고리만 선택 가능합니다.");
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 pt-16 pb-16">
      <div className="w-full h-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
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
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-gray-700 font-semibold mb-2"
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
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
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              관심있는 카테고리 (최대 3개)
            </label>
            <div className="flex flex-wrap">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={`m-1 px-3 py-2 rounded-lg border ${
                    selectedCategories.includes(categoryMap[category])
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            회원가입
          </button>
        </form>
        <p className="mt-4 text-center">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
