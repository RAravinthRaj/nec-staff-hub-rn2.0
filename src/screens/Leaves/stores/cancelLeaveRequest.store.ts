/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { create } from "zustand";
import LeavesService from "../services";

export interface CancelLeaveState {
  cancelLoading: boolean;
  cancelError: string | null;

  cancelLeaveRequest: (leaveId: number) => Promise<any>;
  resetCancelLeaveRequest: () => void;
}

export const useCancelLeaveRequestStore = create<CancelLeaveState>((set) => ({
  cancelLoading: false,
  cancelError: null,

  cancelLeaveRequest: async (leaveId: number) => {
    set({ cancelLoading: true, cancelError: null });

    try {
      const res = await LeavesService.cancelLeaveRequestAPI(leaveId);
      return res;
    } catch (err: any) {
      const message = err?.message || "Failed to cancel leave request";
      set({ cancelError: message });
      throw new Error(message);
    } finally {
      set({ cancelLoading: false });
    }
  },

  resetCancelLeaveRequest: () => {
    set({ cancelLoading: false, cancelError: null });
  },
}));
