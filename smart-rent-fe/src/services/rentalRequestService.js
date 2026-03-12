import api from "../lib/axios";

export const rentalRequestService = {
  getMyRentalRequests: () => {
    return api.get("/rental-requests/me");
  },
  cancelRentalRequest: (id) => {
    return api.delete(`/rental-requests/cancel/${id}`);
  },
  getOwnerRentalRequests: () => {
    return api.get("/rental-requests/owner/me");
  },
  approveRentalRequest: (id) => {
    return api.post(`/rental-requests/owner/approve/${id}`);
  },
  rejectRentalRequest: (id) => {
    return api.post(`/rental-requests/owner/reject/${id}`);
  },
};
