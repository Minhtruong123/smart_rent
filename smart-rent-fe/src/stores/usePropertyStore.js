import { create } from "zustand";
import { propertyService } from "../services/propertyService";

const usePropertyStore = create((set) => ({
  properties: [],
  totalPages: 0,
  loading: false,
  error: null,
  currentProperty: null,
  ownerInfo: null,
  isSubmitting: false,
  requestStatus: { hasHistory: false, latestStatus: null, canRequest: true },

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

  fetchOwnerInfo: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await propertyService.getOwnerByPropertyId(id);
      set({ ownerInfo: response.data, loading: false });
    } catch (error) {
      set({ error: "Không thể tải thông tin chủ nhà", loading: false });
    }
  },

  clearOwnerInfo: () => set({ ownerInfo: null }),

  checkRentalStatus: async (id) => {
    try {
      const response = await propertyService.checkRentalStatus(id);
      set({ requestStatus: response.data });
    } catch (error) {
      set({
        requestStatus: {
          hasHistory: false,
          latestStatus: null,
          canRequest: true,
        },
      });
    }
  },

  sendRentalRequest: async (data) => {
    set({ isSubmitting: true });
    try {
      await propertyService.sendRentalRequest(data);
      set({
        isSubmitting: false,
        requestStatus: {
          hasHistory: true,
          latestStatus: "PENDING",
          canRequest: false,
        },
      });
      return { success: true };
    } catch (error) {
      set({ isSubmitting: false });
      return { success: false };
    }
  },
}));

export default usePropertyStore;
