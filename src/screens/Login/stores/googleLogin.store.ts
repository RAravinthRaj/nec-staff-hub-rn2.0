/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { googleLoginAPI, GoogleLoginParams } from "../services";

type GoogleLoginResponse = {
  message: string;
  token: string;
  role: string;
};

type GoogleLoginState = {
  googleLoginLoading: boolean;
  googleLoginError: string | null;

  fetchGoogleLogin: (email: string) => Promise<GoogleLoginResponse>;
  resetGoogleLogin: () => void;
};

export const useGoogleLoginStore = create<GoogleLoginState>((set) => ({
  googleLoginLoading: false,
  googleLoginError: null,

  fetchGoogleLogin: async (email: string) => {
    try {
      set({ googleLoginLoading: true, googleLoginError: null });

      const res = await googleLoginAPI({ email });

      await SecureStore.setItemAsync("token", res.token);
      await SecureStore.setItemAsync("role", res.role);

      return res;
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Google login failed";

      set({ googleLoginError: message });
      throw new Error(message);
    } finally {
      set({ googleLoginLoading: false });
    }
  },

  resetGoogleLogin: () => {
    set({
      googleLoginLoading: false,
      googleLoginError: null,
    });
  },
}));
