/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { getLeaveCategories, requestLeave } from "./graphql";

class LeaveRequestService {
  private static instance: LeaveRequestService;

  private constructor() {}

  static getInstance(): LeaveRequestService {
    if (!LeaveRequestService.instance) {
      LeaveRequestService.instance = new LeaveRequestService();
    }
    return LeaveRequestService.instance;
  }

  async requestLeaveAPI(
    leaveType: "FULL_DAY" | "HALF_DAY",
    categoryId: number,
    startDate: string,
    endDate: string,
    reason: string,
    documents?: string[],
    force?: boolean,
  ): Promise<any> {
    const res = await requestLeave(
      leaveType,
      categoryId,
      startDate,
      endDate,
      reason,
      documents,
      force,
    );
    return res;
  }

  async getLeaveCategoriesAPI(): Promise<any> {
    const res = await getLeaveCategories();
    return res;
  }
}

export default LeaveRequestService.getInstance();
