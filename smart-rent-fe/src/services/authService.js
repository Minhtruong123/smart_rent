import api from "../lib/axios";

export const authService = {
  signUp(data) {
    return api.post("/auth/register", data);
  },

  signIn(email, password) {
    return api.post("/auth/login", { email, password });
  },

  signOut() {
    return api.post("/auth/logout");
  },

  fetchMe() {
    return api.get("/users/me");
  },

  refresh() {
    return api.post("/auth/refresh-token");
  },
};
