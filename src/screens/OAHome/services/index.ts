/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { OAFilters, OAAttendanceStudentInput } from "./graphql";
import { AuthApi } from "@/services/authApi";

const DEPARTMENTS = [
  { label: "Computer Science & Engineering", value: "1" },
  { label: "Information Technology", value: "2" },
  { label: "Electronics & Communication", value: "3" },
  { label: "Electrical & Electronics", value: "4" },
  { label: "Mechanical Engineering", value: "5" },
];

const YEARS = [
  { label: "II Year", value: "2" },
  { label: "III Year", value: "3" },
  { label: "IV Year", value: "4" },
];

const PERIODS = [
  { id: 1, label: "Period 1 (09:00 AM - 10:00 AM)", period_number: "1", start_time: "09:00", end_time: "10:00" },
  { id: 2, label: "Period 2 (10:00 AM - 11:00 AM)", period_number: "2", start_time: "10:00", end_time: "11:00" },
  { id: 3, label: "Period 3 (11:15 AM - 12:15 PM)", period_number: "3", start_time: "11:15", end_time: "12:15" },
  { id: 4, label: "Period 4 (01:15 PM - 02:15 PM)", period_number: "4", start_time: "13:15", end_time: "14:15" },
  { id: 5, label: "Period 5 (02:15 PM - 03:15 PM)", period_number: "5", start_time: "14:15", end_time: "15:15" },
  { id: 6, label: "Period 6 (03:30 PM - 04:30 PM)", period_number: "6", start_time: "15:30", end_time: "16:30" },
];

class OAHomeService {
  private static instance: OAHomeService;

  private constructor() {}

  static getInstance(): OAHomeService {
    if (!OAHomeService.instance) {
      OAHomeService.instance = new OAHomeService();
    }
    return OAHomeService.instance;
  }

  async getMetaAPI() {
    return {
      payload: {
        departments: DEPARTMENTS,
        years: YEARS,
        periods: PERIODS,
      },
    };
  }

  async getStudentsAPI(filters: OAFilters) {
    try {
      const res = await AuthApi.filterAttendanceRecords(filters as any);

      if (res?.isDeptAdmin && res?.requiresFilter) {
        return {
          payload: {
            students: [],
            summary: {
              total_students: 0,
              present_count: 0,
              absent_count: 0,
              od_count: 0,
              mixed_count: 0,
            },
            pagination: {
              page: 1,
              page_size: 10,
              total_count: 0,
              total_pages: 0,
            },
            requiresFilter: true,
            message: res.message,
          },
        };
      }

      const fetchedList = res?.data || [];
      const students = fetchedList.map((item: any) => ({
        student_id: item.studentId,
        rollNumber: item.registerNumber,
        name: item.studentName,
        status: (item.status || "absent").toLowerCase(),
        present_days: 0,
        absent_days: 0,
        od_days: 0,
        total_days: 0,
      }));

      const present_count = students.filter(
        (s: any) => s.status === "present",
      ).length;
      const absent_count = students.filter(
        (s: any) => s.status === "absent",
      ).length;
      const od_count = students.filter(
        (s: any) => s.status === "onduty" || s.status === "od",
      ).length;

      return {
        payload: {
          students,
          summary: {
            total_students: res?.total || students.length,
            present_count,
            absent_count,
            od_count,
            mixed_count: 0,
          },
          pagination: {
            page: res?.page || filters.page || 1,
            page_size: 10,
            total_count: res?.total || students.length,
            total_pages:
              res?.totalPages ||
              Math.ceil((res?.total || students.length) / 10),
          },
        },
      };
    } catch (e) {
      return {
        payload: {
          students: [],
          summary: {
            total_students: 0,
            present_count: 0,
            absent_count: 0,
            od_count: 0,
            mixed_count: 0,
          },
          pagination: {
            page: filters.page || 1,
            page_size: filters.pageSize || 10,
            total_count: 0,
            total_pages: 0,
          },
        },
      };
    }
  }

  async getReportStudentsAPI(filters: OAFilters) {
    return this.getStudentsAPI(filters);
  }

  async saveAttendanceAPI(
    filters: OAFilters,
    students: OAAttendanceStudentInput[],
  ) {
    return {
      payload: {
        affected_students: students.length,
        affected_dates: 1,
      },
    };
  }

  async exportAttendanceReportAPI(filters: OAFilters) {
    return { payload: { url: "https://example.com/report.pdf" } };
  }
}

export default OAHomeService.getInstance();
