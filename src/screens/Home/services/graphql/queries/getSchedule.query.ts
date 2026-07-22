/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { gql } from "@apollo/client";

export const GET_SCHEDULES = gql`
  query GetTimetable($day: DayOfWeek!) {
    getTimetable(day: $day) {
      courseBatch {
        id
        updated_at
        course {
          course_name
          created_at
          id
          updated_at
          course_code
        }
        batch {
          batch
          created_at
          id
          updated_at
        }
        created_at
      }
      course_batch_id
      created_at
      day_of_week
      id
      period {
        id
        period_number
        start_time
        updated_at
        end_time
        created_at
      }
      semester {
        id
        semester
        updated_at
        created_at
      }
      staff {
        created_at
        date_of_birth
        department {
          id
          name
          updated_at
          created_at
          abbreviation
        }
        designation
        email
        gender
        id
        name
        phone_no
        profile_image
        roll_no
        updated_at
        user_id
      }
      status
      updated_at
      year {
        id
        updated_at
        year
        created_at
      }
    }
  }
`;
