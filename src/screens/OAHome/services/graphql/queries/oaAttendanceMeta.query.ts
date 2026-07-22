/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { gql } from "@apollo/client";

export const OA_ATTENDANCE_META = gql`
  query OAAttendanceMeta {
    oaAttendanceMeta {
      departments {
        label
        value
      }
      years {
        label
        value
      }
      periods {
        id
        label
        period_number
        start_time
        end_time
      }
    }
  }
`;
