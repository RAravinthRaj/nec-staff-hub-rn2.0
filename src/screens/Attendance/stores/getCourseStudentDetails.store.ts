/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { create } from "zustand";
import AttendanceService from "../services";

export interface AttendanceStudent {
  studentId: number;
  rollNumber: number;
  name: string;
  status: "present" | "absent" | "od";
}

export interface AttendanceData {
  totalStudentCount: number;
  presentCount: number;
  absentCount: number;
  odCount: number;
  students: AttendanceStudent[];
}

export interface AttendanceState {
  attendance: AttendanceData | null;

  attendanceLoading: boolean;
  attendanceError: string | null;

  fetchAttendanceStudents: (
    courseBatchId: number,
    periodId: number,
    date: string,
  ) => Promise<void>;

  resetAttendance: () => void;
}

export const useAttendanceStore = create<AttendanceState>((set) => ({
  attendance: null,

  attendanceLoading: false,
  attendanceError: null,

  fetchAttendanceStudents: async (
    courseBatchId: number,
    periodId: number,
    date: string,
  ) => {
    set({
      attendanceLoading: true,
      attendanceError: null,
    });

    try {
      const res = await AttendanceService.getCourseStudentsDetailsAPI(
        courseBatchId,
        periodId,
        date,
      );

      const attendanceObj = res
        ? {
            totalStudentCount: res.total_students || res.students?.length || 0,
            presentCount: res.present_count || 0,
            absentCount: res.absent_count || 0,
            odCount: res.od_count || 0,
            students: res.students || [],
          }
        : null;

      set({
        attendance: attendanceObj,
      });
    } catch (err: any) {
      set({
        attendanceError: err?.message || "Failed to fetch attendance students",
      });
    } finally {
      set({
        attendanceLoading: false,
      });
    }
  },

  resetAttendance: () => {
    set({
      attendance: null,
      attendanceLoading: false,
      attendanceError: null,
    });
  },
}));
