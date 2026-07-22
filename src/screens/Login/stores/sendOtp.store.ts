/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { create } from "zustand";
import { sendOtpAPI, SendOtpParams, SendOtpResponse } from "../services";

type SendOtpState = {
  sendOtpLoading: boolean;
  sendOtpResponse: SendOtpResponse | null;
  sendOtpError: string | null;

  fetchSendOtp: (params: SendOtpParams) => Promise<void>;
  resetSendOtp: () => void;
};

export const useSendOtpStore = create<SendOtpState>((set) => ({
  sendOtpLoading: false,
  sendOtpResponse: null,
  sendOtpError: null,

  fetchSendOtp: async (params: SendOtpParams) => {
    try {
      set({ sendOtpLoading: true, sendOtpError: null });

      const res = await sendOtpAPI(params);

      set({
        sendOtpResponse: {
          message: res?.message || "OTP sent successfully",
          rawOtp: res?.rawOtp,
        },
      });
    } catch (err: any) {
      set({ sendOtpError: err?.message });
    } finally {
      set({ sendOtpLoading: false });
    }
  },

  resetSendOtp: () => {
    set({
      sendOtpLoading: false,
      sendOtpResponse: null,
      sendOtpError: null,
    });
  },
}));
