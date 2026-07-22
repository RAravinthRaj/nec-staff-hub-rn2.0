/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { getLeaveApprovals, reviewLeaveRequest } from "./graphql";

class LeaveApprovalService {
  private static instance: LeaveApprovalService;

  private constructor() {}

  static getInstance(): LeaveApprovalService {
    if (!LeaveApprovalService.instance) {
      LeaveApprovalService.instance = new LeaveApprovalService();
    }
    return LeaveApprovalService.instance;
  }

  async getLeaveApprovalsAPI(status?: string): Promise<any> {
    const res = await getLeaveApprovals(status);
    return res;
  }

  async reviewLeaveRequestAPI(
    leaveId: number,
    status: "APPROVED" | "DECLINED",
    comments: string,
  ): Promise<any> {
    const res = await reviewLeaveRequest(leaveId, status, comments);
    return res;
  }
}

export default LeaveApprovalService.getInstance();
