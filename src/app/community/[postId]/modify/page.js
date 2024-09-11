"use client";
import { useEffect, useState } from "react";
import ModifyContent from "@/components/community/ModifyContent";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

const ModifyPage = ({ params }) => {
  const { postId } = params;
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
  return <ModifyContent postId={postId} />;
};

export default ModifyPage;
