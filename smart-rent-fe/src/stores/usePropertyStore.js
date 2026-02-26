import { create } from "zustand";
import { propertyService } from "../services/propertyService";

const usePropertyStore = create((set) => ({
  properties: [],
  loading: false,
  error: null,

  fetchProperties: async () => {
    set({ loading: true, error: null });
    try {
      const response = await propertyService.listProperty();
      set({ properties: response.data, loading: false });
    } catch (error) {
      set({ error: "Không thể tải danh sách phòng", loading: false });
    }
  },
}));

export default usePropertyStore;
