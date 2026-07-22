/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { getLeaveIntimations } from "./graphql";

class LeaveIntimationService {
  private static instance: LeaveIntimationService;

  private constructor() {}

  static getInstance(): LeaveIntimationService {
    if (!LeaveIntimationService.instance) {
      LeaveIntimationService.instance = new LeaveIntimationService();
    }
    return LeaveIntimationService.instance;
  }

  async getLeaveIntimationsAPI(status?: string): Promise<any> {
    const res = await getLeaveIntimations(status);
    return res;
  }
}

export default LeaveIntimationService.getInstance();
