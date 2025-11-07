import api from './index';
import type { Payment } from '../interfaces/Payment';

export interface CreatePaymentRequest {
  bookingId: string;
  paymentMethod: 'VNPAY' | 'MOMO' | 'CASH';
  returnUrl?: string;
}

export interface CreatePaymentResponse {
  paymentId: string;
  paymentUrl?: string;
  qrCode?: string;
  method: string;
}

export interface VerifyPaymentRequest {
  transactionId: string;
  responseCode: string;
  bookingId: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  booking: any;
  payment: Payment;
}

export const paymentApi = {
  /**
   * Create payment
   */
  create: async (data: CreatePaymentRequest): Promise<CreatePaymentResponse> => {
    return api.post('/payments', data);
  },

  /**
   * Verify payment callback
   */
  verify: async (data: VerifyPaymentRequest): Promise<VerifyPaymentResponse> => {
    return api.post('/payments/verify', data);
  },

  /**
   * Get payment by booking ID
   */
  getByBookingId: async (bookingId: string): Promise<Payment> => {
    return api.get(`/payments/booking/${bookingId}`);
  },

  /**
   * Get payment by transaction ID
   */
  getByTransactionId: async (transactionId: string): Promise<Payment> => {
    return api.get(`/payments/transaction/${transactionId}`);
  },

  /**
   * Admin: Get payment by ID
   */
  getById: async (paymentId: string): Promise<Payment> => {
    return api.get(`/payments/${paymentId}`);
  },

  /**
   * Admin: Refund payment
   */
  refund: async (paymentId: string, reason: string): Promise<Payment> => {
    return api.post(`/payments/${paymentId}/refund`, { reason });
  },

  /**
   * Get payment methods
   */
  getPaymentMethods: async (): Promise<{ method: string; name: string; enabled: boolean }[]> => {
    return api.get('/payments/methods');
  },
};
