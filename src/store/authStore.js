import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  jwt: null,
  isAuthenticated: false,
  user: null,

  fetchUserData: async () => {
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
      set({ user: { email: data.oauthId, nickname: data.nickname } });
      return true;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return false;
    }
  },

  // 로그인
  login: (jwt) => {
    set({ jwt, isAuthenticated: true });
    localStorage.setItem("jwt", jwt);
  },

  // 로그아웃
  logout: () => {
    set({ jwt: null, isAuthenticated: false, user: null });
    localStorage.removeItem("jwt");
  },

  // localStorage에서 jwt 복원 및 사용자 정보 가져오기
  restoreAuth: async () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      set({ jwt });
      const isValid = await get().fetchUserData();
      if (isValid) {
        set({ isAuthenticated: true });
      } else {
        get().logout(); // 토큰이 유효하지 않으면 로그아웃 처리
      }
    }
  },
}));

export default useAuthStore;
