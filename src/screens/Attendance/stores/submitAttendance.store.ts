/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { create } from "zustand";
import AttendanceService from "../services";

export interface SubmitAttendanceState {
  submitLoading: boolean;
  submitError: string | null;

  submitAttendance: (
    period_id: number,
    date: string,
    students: { student_id: number; status: "PRESENT" | "ABSENT" | "ON_DUTY" }[],
  ) => Promise<any>;

  resetSubmitAttendance: () => void;
}

export const useSubmitAttendanceStore = create<SubmitAttendanceState>((set) => ({
  submitLoading: false,
  submitError: null,

  submitAttendance: async (period_id, date, students) => {
    set({ submitLoading: true, submitError: null });

    try {
      const res = await AttendanceService.submitAttendanceEntryAPI(
        period_id,
        date,
        students,
      );

      return res;
    } catch (err: any) {
      const message = err?.message || "Failed to save attendance";
      set({ submitError: message });
      throw new Error(message);
    } finally {
      set({ submitLoading: false });
    }
  },

  resetSubmitAttendance: () => {
    set({ submitLoading: false, submitError: null });
  },
}));
