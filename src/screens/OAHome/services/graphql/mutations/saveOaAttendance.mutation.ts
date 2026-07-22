/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { gql } from "@apollo/client";

export const SAVE_OA_ATTENDANCE = gql`
  mutation SaveOAAttendance(
    $department: String!
    $year: String!
    $startDate: String!
    $endDate: String
    $mode: OAAttendanceMode!
    $periodId: Int
    $students: [OAAttendanceStudentInput!]!
  ) {
    saveOAAttendance(
      department: $department
      year: $year
      start_date: $startDate
      end_date: $endDate
      mode: $mode
      period_id: $periodId
      students: $students
    ) {
      success
      affected_students
      affected_dates
      mode
    }
  }
`;
