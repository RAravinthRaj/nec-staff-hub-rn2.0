/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { gql } from "@apollo/client";

export const GET_LEAVE_REQUESTS = gql`
  query GetLeaveRequests($status: String) {
    leaveRequests(status: $status) {
      id
      staff_id
      category_id
      category_name
      leave_type
      start_date
      end_date
      status
      reason
      documents
      created_at
      updated_at
    }
  }
`;
