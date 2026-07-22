/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { gql } from "@apollo/client";

export const REVIEW_LEAVE_REQUEST = gql`
  mutation ReviewLeaveRequest($leaveId: Int!, $status: LeaveStatus!, $comments: String!) {
    reviewLeaveRequest(leave_id: $leaveId, status: $status, comments: $comments) {
      success
      leave_id
    }
  }
`;
