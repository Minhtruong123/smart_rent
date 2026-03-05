import api from "../lib/axios";

export const propertyService = {
  listProperty(page, size) {
    return api.get(`/property/list?page=${page}&size=${size}`);
  },
  listOwnerProperties: (page = 0, size = 10) => {
    return api.get(`/property/owner-list?page=${page}&size=${size}`);
  },
  getPropertyDetail: (id) => api.get(`/property/${id}`),
  searchProperties: (params) => api.get("/property/search", { params }),
};
