"use client";

import Link from "next/link";
import { useState } from "react";
import { SvgIcon } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="bg-white text-black shadow-sm border-b border-gray-200">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-10 mr-2" />
          <span className="text-xl font-bold">
            <Link href="/">TodayFin</Link>
          </span>
        </div>
        <div className="flex items-center">
          <SvgIcon component={SearchIcon} className="cursor-pointer" />
        </div>
      </div>
      <nav className="bg-white p-2">
        <div className="container mx-auto flex justify-between items-center">
          <ul className="flex space-x-4">
            <li className="relative group">
              <Link href="/stock" className="hover:underline text-sm">
                📈 주식
              </Link>
              <ul className="absolute left-0 hidden bg-white text-black group-hover:block">
                <li className="px-4 py-2">
                  <Link href="/stock/category1" className="block">
                    category1
                  </Link>
                </li>
                <li className="px-4 py-2">
                  <Link href="/stock/category2" className="block">
                    category2
                  </Link>
                </li>
              </ul>
            </li>
            <li className="relative group">
              <Link href="/coin" className="hover:underline text-sm">
                🪙 암호화폐
              </Link>
              <ul className="absolute left-0 hidden bg-white text-black group-hover:block">
                <li className="px-4 py-2">
                  <Link href="/coin/category1" className="block">
                    category1
                  </Link>
                </li>
                <li className="px-4 py-2">
                  <Link href="/coin/category2" className="block">
                    category2
                  </Link>
                </li>
              </ul>
            </li>
            <li className="relative group">
              <Link href="/news" className="hover:underline text-sm">
                📰 뉴스
              </Link>
              <ul className="absolute left-0 hidden bg-white text-black group-hover:block">
                <li className="px-4 py-2">
                  <Link href="/news/category1" className="block">
                    category1
                  </Link>
                </li>
                <li className="px-4 py-2">
                  <Link href="/news/category2" className="block">
                    category2
                  </Link>
                </li>
              </ul>
            </li>
            <li className="relative group">
              <Link href="/community" className="hover:underline text-sm">
                💁 커뮤니티
              </Link>
              <ul className="absolute left-0 hidden bg-white text-black group-hover:block">
                <li className="px-4 py-2">
                  <Link href="/community/category1" className="block">
                    category1
                  </Link>
                </li>
                <li className="px-4 py-2">
                  <Link href="/community/category2" className="block">
                    category2
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <div>
            {isLoggedIn ? (
              <>
                <Link
                  href="/mypage"
                  className="px-2 py-2 text-gray-400 text-sm"
                >
                  마이페이지
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-2 py-2 text-gray-400 text-sm"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="px-2 py-2 text-gray-400 text-sm"
                >
                  로그인
                </button>
                <Link
                  href="/signup"
                  className="px-2 py-2 text-gray-400 text-sm"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
