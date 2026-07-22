/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { create } from "zustand";
import LeaveRequestService from "../services";

export interface LeaveCategoryItem {
  id: number;
  name: string;
  max_days: number;
  remaining_days: number;
}

export interface LeaveCategoriesState {
  categories: LeaveCategoryItem[];
  categoriesLoading: boolean;
  categoriesError: string | null;

  fetchLeaveCategories: () => Promise<void>;
  resetLeaveCategories: () => void;
}

export const useLeaveCategoriesStore = create<LeaveCategoriesState>((set) => ({
  categories: [],
  categoriesLoading: false,
  categoriesError: null,

  fetchLeaveCategories: async () => {
    set({ categoriesLoading: true, categoriesError: null });

    try {
      const res = await LeaveRequestService.getLeaveCategoriesAPI();
      set({ categories: res?.payload ?? [] });
    } catch (err: any) {
      set({
        categoriesError: err?.message || "Failed to fetch leave categories",
      });
    } finally {
      set({ categoriesLoading: false });
    }
  },

  resetLeaveCategories: () => {
    set({ categories: [], categoriesLoading: false, categoriesError: null });
  },
}));
