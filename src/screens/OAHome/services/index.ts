/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { OAFilters, OAAttendanceStudentInput } from "./graphql";

const MOCK_DEPARTMENTS = [
  { label: "Computer Science & Engineering", value: "CSE" },
  { label: "Information Technology", value: "IT" },
  { label: "Electronics & Communication", value: "ECE" },
  { label: "Electrical & Electronics", value: "EEE" },
  { label: "Mechanical Engineering", value: "MECH" },
  { label: "Civil Engineering", value: "CIVIL" },
];

const MOCK_YEARS = [
  { label: "I Year", value: "I" },
  { label: "II Year", value: "II" },
  { label: "III Year", value: "III" },
  { label: "IV Year", value: "IV" },
];

const MOCK_PERIODS = [
  { id: 1, label: "Period 1 (09:00 AM - 10:00 AM)", period_number: "1", start_time: "09:00", end_time: "10:00" },
  { id: 2, label: "Period 2 (10:00 AM - 11:00 AM)", period_number: "2", start_time: "10:00", end_time: "11:00" },
  { id: 3, label: "Period 3 (11:15 AM - 12:15 PM)", period_number: "3", start_time: "11:15", end_time: "12:15" },
  { id: 4, label: "Period 4 (01:15 PM - 02:15 PM)", period_number: "4", start_time: "13:15", end_time: "14:15" },
  { id: 5, label: "Period 5 (02:15 PM - 03:15 PM)", period_number: "5", start_time: "14:15", end_time: "15:15" },
  { id: 6, label: "Period 6 (03:30 PM - 04:30 PM)", period_number: "6", start_time: "15:30", end_time: "16:30" },
];

const ALL_MOCK_STUDENTS = [
  { student_id: 101, rollNumber: 2115001, name: "Aadhithya V", status: "present", present_days: 28, absent_days: 2, od_days: 0, total_days: 30 },
  { student_id: 102, rollNumber: 2115002, name: "Abinaya K", status: "present", present_days: 29, absent_days: 1, od_days: 0, total_days: 30 },
  { student_id: 103, rollNumber: 2115003, name: "Bala Subramanian R", status: "absent", present_days: 22, absent_days: 7, od_days: 1, total_days: 30 },
  { student_id: 104, rollNumber: 2115004, name: "Deepak Kumar M", status: "present", present_days: 27, absent_days: 2, od_days: 1, total_days: 30 },
  { student_id: 105, rollNumber: 2115005, name: "Dharshini S", status: "present", present_days: 30, absent_days: 0, od_days: 0, total_days: 30 },
  { student_id: 106, rollNumber: 2115006, name: "Gokul Nath P", status: "onDuty", present_days: 25, absent_days: 1, od_days: 4, total_days: 30 },
  { student_id: 107, rollNumber: 2115007, name: "Hari Haran K", status: "present", present_days: 28, absent_days: 2, od_days: 0, total_days: 30 },
  { student_id: 108, rollNumber: 2115008, name: "Kavitha R", status: "absent", present_days: 20, absent_days: 9, od_days: 1, total_days: 30 },
  { student_id: 109, rollNumber: 2115009, name: "Manish Kumar A", status: "present", present_days: 29, absent_days: 1, od_days: 0, total_days: 30 },
  { student_id: 110, rollNumber: 2115010, name: "Nivetha P", status: "present", present_days: 28, absent_days: 2, od_days: 0, total_days: 30 },
  { student_id: 111, rollNumber: 2115011, name: "Praveen Raj T", status: "present", present_days: 26, absent_days: 3, od_days: 1, total_days: 30 },
  { student_id: 112, rollNumber: 2115012, name: "Ram Kumar V", status: "absent", present_days: 19, absent_days: 10, od_days: 1, total_days: 30 },
  { student_id: 113, rollNumber: 2115013, name: "Sowmiya M", status: "present", present_days: 30, absent_days: 0, od_days: 0, total_days: 30 },
  { student_id: 114, rollNumber: 2115014, name: "Vigneshwaran S", status: "present", present_days: 27, absent_days: 3, od_days: 0, total_days: 30 },
  { student_id: 115, rollNumber: 2115015, name: "Yogesh K", status: "absent", present_days: 21, absent_days: 8, od_days: 1, total_days: 30 },
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
        departments: MOCK_DEPARTMENTS,
        years: MOCK_YEARS,
        periods: MOCK_PERIODS,
      },
    };
  }

  async getStudentsAPI(filters: OAFilters) {
    let filtered = [...ALL_MOCK_STUDENTS];

    if (filters.status) {
      const targetStatus = filters.status.toLowerCase();
      filtered = filtered.filter((s) => s.status.toLowerCase() === targetStatus);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      filtered = filtered.filter(
        (s) => s.name.toLowerCase().includes(q) || String(s.rollNumber).includes(q),
      );
    }

    const present_count = filtered.filter((s) => s.status === "present").length;
    const absent_count = filtered.filter((s) => s.status === "absent").length;
    const od_count = filtered.filter((s) => s.status === "onDuty").length;

    return {
      payload: {
        students: filtered,
        summary: {
          total_students: filtered.length,
          present_count,
          absent_count,
          od_count,
          mixed_count: 0,
        },
        pagination: {
          page: filters.page || 1,
          page_size: filters.pageSize || 10,
          total_count: filtered.length,
          total_pages: 1,
        },
      },
    };
  }

  async getReportStudentsAPI(filters: OAFilters) {
    return this.getStudentsAPI(filters);
  }

  async saveAttendanceAPI(filters: OAFilters, students: OAAttendanceStudentInput[]) {
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
