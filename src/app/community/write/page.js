"use client";
import { useEffect, useState } from "react";
import WriteContent from "@/components/community/WriteContent";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

const WritePage = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const restoreAuth = useAuthStore((state) => state.restoreAuth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await restoreAuth();
      setIsLoading(false);
    };

    initAuth();
  }, [restoreAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      alert("로그인이 필요합니다.");
      router.push("/login");
    }
  }, [isAuthenticated, restoreAuth, router]);
  return <WriteContent />;
};

export default WritePage;
