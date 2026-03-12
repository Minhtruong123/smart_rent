import api from "../lib/axios";

export const authService = {
  signUp(data) {
    return api.post("/auth/register", data);
  },

  signIn(email, password) {
    return api.post("/auth/login", { email, password });
  },

  signOut(accessToken, refreshToken) {
    return api.post("/auth/logout", { accessToken, refreshToken });
  },

  fetchMe() {
    return api.get("/user/me");
  },

  refresh() {
    return api.post("/auth/refresh-token");
  },
};
