import api from "../lib/axios";

export const propertyService = {
  listProperty() {
    return api.get("/property/list");
  },
  getPropertyDetail: (id) => api.get(`/property/${id}`),
  searchProperties: (params) => api.get("/property/search", { params }),
};
