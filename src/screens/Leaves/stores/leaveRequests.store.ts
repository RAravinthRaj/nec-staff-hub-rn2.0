/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { create } from "zustand";
import LeavesService from "../services";

export interface LeaveRequestsState {
  leaveDetails: Record<string, any[]>;
  leaveRequestsLoading: boolean;
  leaveRequestsError: string | null;

  fetchLeaveRequests: (status?: string) => Promise<void>;
  resetLeaveRequests: () => void;
}

export const useLeaveRequestsStore = create<LeaveRequestsState>((set) => ({
  leaveDetails: {},
  leaveRequestsLoading: false,
  leaveRequestsError: null,

  fetchLeaveRequests: async (status?: string) => {
    set({ leaveRequestsLoading: true, leaveRequestsError: null });

    try {
      const res = await LeavesService.getLeaveRequestsAPI(status);
      set({ leaveDetails: res?.payload ?? {} });
    } catch (err: any) {
      set({
        leaveRequestsError: err?.message || "Failed to fetch leave requests",
      });
    } finally {
      set({ leaveRequestsLoading: false });
    }
  },

  resetLeaveRequests: () => {
    set({
      leaveDetails: {},
      leaveRequestsLoading: false,
      leaveRequestsError: null,
    });
  },
}));
