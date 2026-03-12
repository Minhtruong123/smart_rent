import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "../services/authService";

export const useAuthStore = create((set, get) => ({
  accessToken: localStorage.getItem("accessToken") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,

  setAccessToken: (token) => set({ accessToken: token }),

  clearState: () => set({ accessToken: null, user: null, loading: false }),

  signIn: async (email, password) => {
    try {
      set({ loading: true });

      const res = await authService.signIn(email, password);
      const { accessToken, refreshToken, user } = res.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

      set({ accessToken, user });

      toast.success("Đăng nhập thành công 🎉");
      return true;
    } catch {
      toast.error("Đăng nhập thất bại");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  signUp: async (data) => {
    try {
      set({ loading: true });
      await authService.signUp(data);
      toast.success("Đăng ký thành công");
      return true;
    } catch {
      toast.error("Đăng ký thất bại");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      await authService.signOut(accessToken, refreshToken);
      toast.success("Đã đăng xuất");
    } catch {
      toast.error("Logout lỗi");
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      get().clearState();
      toast.success("Đã đăng xuất thành công");
    }
  },

  fetchMe: async () => {
    try {
      const res = await authService.fetchMe();
      set({ user: res.data });
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      console.error("FetchMe lỗi:", error.response?.status);
      get().clearState();
    }
  },

  refresh: async () => {
    try {
      const res = await authService.refresh();
      set({ accessToken: res.data.accessToken });

      if (!get().user) {
        await get().fetchMe();
      }
    } catch {
      get().clearState();
    }
  },
}));
