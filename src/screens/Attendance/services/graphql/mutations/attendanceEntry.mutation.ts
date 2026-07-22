/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { gql } from "@apollo/client";

export const ATTENDANCE_ENTRY = gql`
  mutation AttendanceEntry(
    $periodId: Int!
    $date: String!
    $students: [AttendanceEntryStudentInput!]!
  ) {
    attendanceEntry(period_id: $periodId, date: $date, students: $students) {
      success
      totalStudentCount
      period_id
      date
    }
  }
`;
