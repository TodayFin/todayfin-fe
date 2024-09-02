import create from "zustand";

const useAuthStore = create((set) => ({
  jwt: null,
  isAuthenticated: false,

  // 로그인
  login: (jwt) => {
    set({ jwt, isAuthenticated: true });
    localStorage.setItem("jwt", jwt); // localStorage에 저장
  },

  // 로그아웃
  logout: () => {
    set({ jwt: null, isAuthenticated: false });
    localStorage.removeItem("jwt"); // localStorage에서 제거
  },

  // localStorage에서 jwt 복원
  restoreAuth: () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      set({ jwt, isAuthenticated: true });
    }
  },
}));

export default useAuthStore;
