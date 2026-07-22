/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { gql } from "@apollo/client";

export const GET_COURSE_STUDENTS_DETAILS = gql`
  query GetCourseBatchStudents(
    $courseBatchId: Int!
    $periodId: Int!
    $date: String!
  ) {
    getCourseBatchStudents(
      course_batch_id: $courseBatchId
      period_id: $periodId
      date: $date
    ) {
      odCount
      presentCount
      students {
        name
        rollNumber
        status
        student_id
      }
      absentCount
      totalStudentCount
    }
  }
`;
