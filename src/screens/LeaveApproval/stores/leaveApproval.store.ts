/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { create } from "zustand";
import LeaveApprovalService from "../services";

export interface LeaveApprovalState {
  leaveDetails: Record<string, any[]>;
  leaveLoading: boolean;
  leaveError: string | null;
  reviewLoading: boolean;
  reviewError: string | null;

  fetchLeaveApprovals: (status?: string) => Promise<void>;
  reviewLeaveRequest: (
    leaveId: number,
    status: "APPROVED" | "DECLINED",
    comments: string,
  ) => Promise<any>;
  resetLeaveApprovals: () => void;
}

export const useLeaveApprovalStore = create<LeaveApprovalState>((set) => ({
  leaveDetails: {},
  leaveLoading: false,
  leaveError: null,
  reviewLoading: false,
  reviewError: null,

  fetchLeaveApprovals: async (status?: string) => {
    set({ leaveLoading: true, leaveError: null });

    try {
      const res = await LeaveApprovalService.getLeaveApprovalsAPI(status);
      set({ leaveDetails: res?.payload ?? {} });
    } catch (err: any) {
      set({ leaveError: err?.message || "Failed to fetch leave approvals" });
    } finally {
      set({ leaveLoading: false });
    }
  },

  reviewLeaveRequest: async (leaveId, status, comments) => {
    set({ reviewLoading: true, reviewError: null });

    try {
      const res = await LeaveApprovalService.reviewLeaveRequestAPI(
        leaveId,
        status,
        comments,
      );
      return res;
    } catch (err: any) {
      const message = err?.message || "Failed to review leave request";
      set({ reviewError: message });
      throw new Error(message);
    } finally {
      set({ reviewLoading: false });
    }
  },

  resetLeaveApprovals: () => {
    set({
      leaveDetails: {},
      leaveLoading: false,
      leaveError: null,
      reviewLoading: false,
      reviewError: null,
    });
  },
}));
