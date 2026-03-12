import { create } from "zustand";
import { rentalRequestService } from "../services/rentalRequestService";

export const useRentalRequestStore = create((set, get) => ({
  myRequests: [],
  loadingRequests: false,

  fetchMyRequests: async () => {
    set({ loadingRequests: true });
    try {
      const response = await rentalRequestService.getMyRentalRequests();
      set({ myRequests: response.data, loadingRequests: false });
    } catch (error) {
      console.error("Lỗi lấy danh sách yêu cầu:", error);
      set({ myRequests: [], loadingRequests: false });
    }
  },
  cancelRequest: async (id) => {
    try {
      await rentalRequestService.cancelRentalRequest(id);
      get().fetchMyRequests();
      return { success: true };
    } catch (error) {
      console.error("Lỗi hủy yêu cầu:", error);
      return {
        success: false,
        message: error.response?.data || "Có lỗi xảy ra",
      };
    }
  },

  ownerRequests: [],
  loadingOwnerRequests: false,

  fetchOwnerRequests: async () => {
    set({ loadingOwnerRequests: true });
    try {
      const response = await rentalRequestService.getOwnerRentalRequests();
      set({ ownerRequests: response.data, loadingOwnerRequests: false });
    } catch (error) {
      console.error("Lỗi lấy danh sách yêu cầu của chủ nhà:", error);
      set({ ownerRequests: [], loadingOwnerRequests: false });
    }
  },

  approveRequest: async (id) => {
    try {
      await rentalRequestService.approveRentalRequest(id);
      get().fetchOwnerRequests();
      return { success: true };
    } catch (error) {
      console.error("Lỗi duyệt yêu cầu:", error);
      return {
        success: false,
        message: error.response?.data || "Có lỗi xảy ra khi duyệt yêu cầu",
      };
    }
  },

  rejectRequest: async (id) => {
    try {
      await rentalRequestService.rejectRentalRequest(id);
      get().fetchOwnerRequests();
      return { success: true };
    } catch (error) {
      console.error("Lỗi từ chối yêu cầu:", error);
      return {
        success: false,
        message: error.response?.data || "Có lỗi xảy ra khi từ chối yêu cầu",
      };
    }
  },
}));
