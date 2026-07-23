/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

export type Role = "STAFF" | "HOD" | "Department Admin";

export interface UserProfile {
  userId?: number;
  email: string;
  name: string;
  role: Role;
  designation?: string;
  department?: string;
  staffId?: string;
  phone?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  token: string | null;
  user: UserProfile | null;
  loginSuccess: (token: string, user: UserProfile) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  isLoading: true,
  token: null,
  user: null,

  loginSuccess: async (token: string, user: UserProfile) => {
    try {
      await SecureStore.setItemAsync("userToken", token);
      await SecureStore.setItemAsync("userData", JSON.stringify(user));
    } catch (err) {
      console.warn("Error writing to SecureStore", err);
    }
    set({ isLoggedIn: true, token, user, isLoading: false });
  },

  logout: async () => {
    try {
      await SecureStore.deleteItemAsync("userToken");
      await SecureStore.deleteItemAsync("userData");
    } catch (err) {
      console.warn("Error clearing SecureStore", err);
    }
    set({ isLoggedIn: false, token: null, user: null, isLoading: false });
  },

  checkAuthSession: async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("userToken");
      const storedUserData = await SecureStore.getItemAsync("userData");

      if (storedToken && storedUserData) {
        const parsedUser: UserProfile = JSON.parse(storedUserData);
        set({
          isLoggedIn: true,
          token: storedToken,
          user: parsedUser,
          isLoading: false,
        });
        return;
      }
    } catch (err) {
      console.warn("Error reading SecureStore", err);
    }
    set({ isLoggedIn: false, token: null, user: null, isLoading: false });
  },
}));
