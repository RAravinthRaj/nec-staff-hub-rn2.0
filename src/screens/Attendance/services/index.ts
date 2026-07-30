/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { AuthApi } from "@/services/authApi";

class AttendanceService {
  private static instance: AttendanceService;

  private constructor() {}

  static getInstance(): AttendanceService {
    if (!AttendanceService.instance) {
      AttendanceService.instance = new AttendanceService();
    }
    return AttendanceService.instance;
  }

  async getCourseStudentsDetailsAPI(
    course_batch_id: number,
    period_id: number,
    date: string,
  ): Promise<any> {
    try {
      const formattedDate = date ? (date.includes(".") ? date.split(".").reverse().join("-") : date) : undefined;
      const res = await AuthApi.getStudentsForAttendance(course_batch_id, 1, formattedDate, period_id);
      const fetchedStudents = res?.students || [];

      const students = fetchedStudents.map((s: any) => ({
        studentId: s.studentId,
        rollNumber: s.registerNumber || s.rollNumber,
        name: s.studentName || s.name,
        status: (s.status || "absent").toLowerCase(),
      }));

      const presentCount = students.filter((s: any) => s.status === "present").length;
      const absentCount = students.filter((s: any) => s.status === "absent").length;
      const odCount = students.filter((s: any) => s.status === "od" || s.status === "onduty").length;

      return {
        course_batch_id,
        period_id,
        date,
        total_students: students.length,
        present_count: presentCount,
        absent_count: absentCount,
        od_count: odCount,
        students,
      };
    } catch (error: any) {
      return {
        course_batch_id,
        period_id,
        date,
        total_students: 0,
        present_count: 0,
        absent_count: 0,
        od_count: 0,
        students: [],
      };
    }
  }

  async submitAttendanceEntryAPI(
    period_id: number,
    date: string,
    students: { student_id: number; status: "PRESENT" | "ABSENT" | "ON_DUTY" }[],
  ): Promise<any> {
    const formattedDate = date ? (date.includes(".") ? date.split(".").reverse().join("-") : date) : new Date().toISOString().split("T")[0];
    const records = students.map((s) => ({
      regno: String(s.student_id),
      status: s.status === "PRESENT" ? "P" : s.status === "ON_DUTY" ? "OD" : "A",
    }));

    return AuthApi.submitAttendance({
      courseId: 1,
      sectionId: 1,
      periodNumber: period_id,
      attendanceDate: formattedDate,
      records,
    });
  }
}

export default AttendanceService.getInstance();
