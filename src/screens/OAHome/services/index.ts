/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import {
  exportOAAttendanceReport,
  getOAAttendanceMeta,
  getOAAttendanceReportStudents,
  getOAAttendanceStudents,
  OAFilters,
  OAAttendanceStudentInput,
  saveOAAttendance,
} from "./graphql";

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
    return getOAAttendanceMeta();
  }

  async getStudentsAPI(filters: OAFilters) {
    return getOAAttendanceStudents(filters);
  }

  async getReportStudentsAPI(filters: OAFilters) {
    return getOAAttendanceReportStudents(filters);
  }

  async saveAttendanceAPI(filters: OAFilters, students: OAAttendanceStudentInput[]) {
    return saveOAAttendance(filters, students);
  }

  async exportAttendanceReportAPI(filters: OAFilters) {
    return exportOAAttendanceReport(filters);
  }
}

export default OAHomeService.getInstance();
