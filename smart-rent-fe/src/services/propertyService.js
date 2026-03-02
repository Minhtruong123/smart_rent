import api from "../lib/axios";

export const propertyService = {
  listProperty(page, size) {
    return api.get(`/property/list?page=${page}&size=${size}`);
  },
  getPropertyDetail: (id) => api.get(`/property/${id}`),
  searchProperties: (params) => api.get("/property/search", { params }),
};
