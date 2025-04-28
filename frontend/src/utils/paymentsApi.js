import { api } from "./api";

// 1. Create a payment (POST)
export const createPayments = (amount, orderId) =>
  api.post("/payment/create", { amount, orderId });

// 2. Handle success after PayPal redirects (GET)
export const paymentsSuccess = (paymentId, PayerID) =>
  api.get(`/payment/success?paymentId=${paymentId}&PayerID=${PayerID}`);

// 3. Handle cancel (GET)
export const paymentsCancel = () => api.get("/payment/cancel");
