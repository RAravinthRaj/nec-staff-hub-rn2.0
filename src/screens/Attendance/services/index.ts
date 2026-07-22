/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { getCourseBatchStudents, submitAttendanceEntry } from "./graphql";

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
    const res = await getCourseBatchStudents(course_batch_id, period_id, date);
    return res;
  }

  async submitAttendanceEntryAPI(
    period_id: number,
    date: string,
    students: { student_id: number; status: "PRESENT" | "ABSENT" | "ON_DUTY" }[],
  ): Promise<any> {
    const res = await submitAttendanceEntry(period_id, date, students);
    return res;
  }
}

export default AttendanceService.getInstance();
