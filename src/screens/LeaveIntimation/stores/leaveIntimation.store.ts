/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { create } from "zustand";
import LeaveIntimationService from "../services";

export interface LeaveIntimationState {
  leaveDetails: Record<string, any[]>;
  leaveLoading: boolean;
  leaveError: string | null;

  fetchLeaveIntimations: (status?: string) => Promise<void>;
  resetLeaveIntimations: () => void;
}

export const useLeaveIntimationStore = create<LeaveIntimationState>((set) => ({
  leaveDetails: {},
  leaveLoading: false,
  leaveError: null,

  fetchLeaveIntimations: async (status?: string) => {
    set({ leaveLoading: true, leaveError: null });

    try {
      const res = await LeaveIntimationService.getLeaveIntimationsAPI(status);
      set({ leaveDetails: res?.payload ?? {} });
    } catch (err: any) {
      set({ leaveError: err?.message || "Failed to fetch leave requests" });
    } finally {
      set({ leaveLoading: false });
    }
  },

  resetLeaveIntimations: () => {
    set({ leaveDetails: {}, leaveLoading: false, leaveError: null });
  },
}));
