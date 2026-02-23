import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "../services/authService";

export const useAuthStore = create((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  setAccessToken: (token) => set({ accessToken: token }),

  clearState: () => set({ accessToken: null, user: null, loading: false }),

  signIn: async (email, password) => {
    try {
      set({ loading: true });

      const res = await authService.signIn(email, password);
      const { accessToken, user } = res.data;
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
      get().clearState();
      await authService.signOut();
      toast.success("Đã đăng xuất");
    } catch {
      toast.error("Logout lỗi");
    }
  },

  fetchMe: async () => {
    try {
      const res = await authService.fetchMe();
      set({ user: res.data.user });
    } catch {
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
