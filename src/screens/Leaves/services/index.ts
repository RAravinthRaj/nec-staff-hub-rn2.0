/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { cancelLeaveRequest, getLeaveRequests } from "./graphql";

class LeavesService {
  private static instance: LeavesService;

  private constructor() {}

  static getInstance(): LeavesService {
    if (!LeavesService.instance) {
      LeavesService.instance = new LeavesService();
    }
    return LeavesService.instance;
  }

  async getLeaveRequestsAPI(status?: string): Promise<any> {
    const res = await getLeaveRequests(status);
    return res;
  }

  async cancelLeaveRequestAPI(leaveId: number): Promise<any> {
    const res = await cancelLeaveRequest(leaveId);
    return res;
  }
}

export default LeavesService.getInstance();
