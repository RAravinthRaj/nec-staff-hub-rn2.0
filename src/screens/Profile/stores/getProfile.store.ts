/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { create } from "zustand";
import ProfileService from "../services";

export interface Department {
  id: string;
  name: string;
  abbreviation: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Profile {
  id: string;
  user_id: string;
  email: string;
  name: string;
  roll_no: number;
  phone_no?: string | null;
  profile_image?: string | null;
  date_of_birth?: string | null;
  created_at?: string;
  updated_at?: string;
  department?: Department | null;
}

export interface ProfileState {
  profile: Profile | null;
  profileLoading: boolean;
  profileError: string | null;

  fetchProfile: () => Promise<void>;
  resetProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  profileLoading: false,
  profileError: null,

  fetchProfile: async () => {
    try {
      set({ profileLoading: true, profileError: null });

      const res = await ProfileService.getProfileAPI();

      set({
        profile: res?.payload?.profile ?? null,
      });
    } catch (err: any) {
      const message = err?.message || "Failed to fetch profile";

      set({
        profileError: message,
      });

      throw new Error(message);
    } finally {
      set({ profileLoading: false });
    }
  },

  resetProfile: () => {
    set({
      profile: null,
      profileLoading: false,
      profileError: null,
    });
  },
}));
