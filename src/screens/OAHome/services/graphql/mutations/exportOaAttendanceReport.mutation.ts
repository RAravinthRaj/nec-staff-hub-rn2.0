/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { gql } from "@apollo/client";

export const EXPORT_OA_ATTENDANCE_REPORT = gql`
  mutation ExportOAAttendanceReport(
    $department: String!
    $year: String!
    $startDate: String!
    $endDate: String
    $mode: OAAttendanceMode!
    $status: String
    $search: String
  ) {
    exportOAAttendanceReport(
      department: $department
      year: $year
      start_date: $startDate
      end_date: $endDate
      mode: $mode
      status: $status
      search: $search
    ) {
      success
      message
    }
  }
`;
