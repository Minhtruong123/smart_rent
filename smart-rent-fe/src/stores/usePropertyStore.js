import { create } from "zustand";
import { propertyService } from "../services/propertyService";

const usePropertyStore = create((set) => ({
  properties: [],
  totalPages: 0,
  loading: false,
  error: null,
  currentProperty: null,

  fetchProperties: async (page, size, filters = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await propertyService.listProperty(page, size, filters);
      const data = response.data.content || response.data;
      const total = response.data.totalPages || 0;
      set({ properties: data, totalPages: total, loading: false });
    } catch (error) {
      set({ error: "Không thể tải danh sách phòng", loading: false });
    }
  },

  fetchOwnerProperties: async (page = 0, size = 10) => {
    set({ loading: true, error: null });
    try {
      const response = await propertyService.listOwnerProperties(page, size);
      const data = response.data.content || response.data;
      const total = response.data.totalPages || 0;
      set({ properties: data, totalPages: total, loading: false });
    } catch (error) {
      set({
        error: "Không thể tải danh sách bất động sản của bạn",
        loading: false,
      });
    }
  },

  fetchDetail: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await propertyService.getPropertyDetail(id);
      set({ currentProperty: response.data, loading: false });
    } catch (error) {
      set({ error: "Không thể tải chi tiết nhà", loading: false });
    }
  },
}));

export default usePropertyStore;
