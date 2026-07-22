/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { gql } from "@apollo/client";

export const OA_ATTENDANCE_REPORT_STUDENTS = gql`
  query OAAttendanceReportStudents(
    $department: String!
    $year: String!
    $startDate: String!
    $endDate: String
    $mode: OAAttendanceMode!
    $status: String
    $search: String
    $page: Int
    $pageSize: Int
  ) {
    oaAttendanceReportStudents(
      department: $department
      year: $year
      start_date: $startDate
      end_date: $endDate
      mode: $mode
      status: $status
      search: $search
      page: $page
      page_size: $pageSize
    ) {
      students {
        student_id
        rollNumber
        name
        status
        present_days
        absent_days
        od_days
        total_days
      }
      pagination {
        page
        page_size
        total_count
        total_pages
      }
      summary {
        total_students
        present_count
        absent_count
        od_count
        mixed_count
      }
    }
  }
`;
