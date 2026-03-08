import api from "../lib/axios";

export const propertyService = {
  listProperty(page = 0, size = 6, filters = {}) {
    return api.get("/property/list", {
      params: {
        page: page,
        size: size,
        title: filters.title || undefined,
        type: filters.type || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        bedrooms: filters.bedrooms || undefined,
      },
    });
  },
  listOwnerProperties: (page = 0, size = 10) => {
    return api.get(`/property/owner-list?page=${page}&size=${size}`);
  },
  getPropertyDetail: (id) => api.get(`/property/${id}`),
};
