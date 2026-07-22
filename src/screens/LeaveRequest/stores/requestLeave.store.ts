/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { create } from "zustand";
import LeaveRequestService from "../services";

export interface LeaveRequestState {
  requestLoading: boolean;
  requestError: string | null;

  requestLeave: (
    leaveType: "FULL_DAY" | "HALF_DAY",
    categoryId: number,
    startDate: string,
    endDate: string,
    reason: string,
    documents?: string[],
    force?: boolean,
  ) => Promise<any>;

  resetRequestLeave: () => void;
}

export const useLeaveRequestStore = create<LeaveRequestState>((set) => ({
  requestLoading: false,
  requestError: null,

  requestLeave: async (
    leaveType,
    categoryId,
    startDate,
    endDate,
    reason,
    documents,
    force,
  ) => {
    set({ requestLoading: true, requestError: null });

    try {
      const res = await LeaveRequestService.requestLeaveAPI(
        leaveType,
        categoryId,
        startDate,
        endDate,
        reason,
        documents,
        force,
      );

      return res;
    } catch (err: any) {
      const message = err?.message || "Failed to submit leave request";
      set({ requestError: message });
      throw new Error(message);
    } finally {
      set({ requestLoading: false });
    }
  },

  resetRequestLeave: () => {
    set({ requestLoading: false, requestError: null });
  },
}));
