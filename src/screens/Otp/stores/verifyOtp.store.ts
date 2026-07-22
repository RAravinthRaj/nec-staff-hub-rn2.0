/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { verifyOtpAPI } from "@/screens/Otp/services";

type VerifyOtpState = {
  verifyOtpLoading: boolean;
  verifyOtpError: string | null;

  fetchVerifyOtp: (
    email: string,
    otp: string,
  ) => Promise<{
    message: string;
    token: string;
    role: string;
  }>;

  resetVerifyOtp: () => void;
};

export const useVerifyOtpStore = create<VerifyOtpState>((set) => ({
  verifyOtpLoading: false,
  verifyOtpError: null,

  fetchVerifyOtp: async (email: string, otp: string) => {
    try {
      set({ verifyOtpLoading: true, verifyOtpError: null });

      const res = await verifyOtpAPI({ email, otp });

      await SecureStore.setItemAsync("token", res.token);
      await SecureStore.setItemAsync("role", res.role);

      return res;
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "OTP verification failed";

      set({ verifyOtpError: message });
      throw new Error(message);
    } finally {
      set({ verifyOtpLoading: false });
    }
  },

  resetVerifyOtp: () => {
    set({
      verifyOtpLoading: false,
      verifyOtpError: null,
    });
  },
}));
