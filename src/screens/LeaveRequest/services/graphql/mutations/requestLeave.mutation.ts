/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { gql } from "@apollo/client";

export const REQUEST_LEAVE = gql`
  mutation RequestLeave(
    $leaveType: LeaveType!
    $categoryId: Int!
    $startDate: String!
    $endDate: String!
    $reason: String!
    $documents: [String!]
    $force: Boolean
  ) {
    requestLeave(
      leave_type: $leaveType
      category_id: $categoryId
      start_date: $startDate
      end_date: $endDate
      reason: $reason
      documents: $documents
      force: $force
    ) {
      success
      can_submit
      leave_id
      used_days
      remaining_days
      required_days
      warning
    }
  }
`;
