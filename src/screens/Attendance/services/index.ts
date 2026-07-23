/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { AuthApi } from "@/services/authApi";

const MOCK_STUDENTS = [
  { studentId: 101, rollNumber: 2115001, name: "Aadhithya V", status: "present" },
  { studentId: 102, rollNumber: 2115002, name: "Abinaya K", status: "present" },
  { studentId: 103, rollNumber: 2115003, name: "Bala Subramanian R", status: "absent" },
  { studentId: 104, rollNumber: 2115004, name: "Deepak Kumar M", status: "present" },
  { studentId: 105, rollNumber: 2115005, name: "Dharshini S", status: "present" },
  { studentId: 106, rollNumber: 2115006, name: "Gokul Nath P", status: "od" },
  { studentId: 107, rollNumber: 2115007, name: "Hari Haran K", status: "present" },
  { studentId: 108, rollNumber: 2115008, name: "Kavitha R", status: "absent" },
  { studentId: 109, rollNumber: 2115009, name: "Manish Kumar A", status: "present" },
  { studentId: 110, rollNumber: 2115010, name: "Nivetha P", status: "present" },
  { studentId: 111, rollNumber: 2115011, name: "Praveen Raj T", status: "present" },
  { studentId: 112, rollNumber: 2115012, name: "Ram Kumar V", status: "absent" },
  { studentId: 113, rollNumber: 2115013, name: "Sowmiya M", status: "present" },
  { studentId: 114, rollNumber: 2115014, name: "Vigneshwaran S", status: "present" },
  { studentId: 115, rollNumber: 2115015, name: "Yogesh K", status: "absent" },
];

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

      const studentList = fetchedStudents.map((s: any) => ({
        studentId: s.studentId,
        rollNumber: s.registerNumber || s.rollNumber,
        name: s.studentName || s.name,
        status: (s.status || "absent").toLowerCase(),
      }));

      const students = studentList.length > 0 ? studentList : MOCK_STUDENTS;
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
        total_students: MOCK_STUDENTS.length,
        present_count: MOCK_STUDENTS.filter((s) => s.status === "present").length,
        absent_count: MOCK_STUDENTS.filter((s) => s.status === "absent").length,
        od_count: MOCK_STUDENTS.filter((s) => s.status === "od").length,
        students: MOCK_STUDENTS,
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
