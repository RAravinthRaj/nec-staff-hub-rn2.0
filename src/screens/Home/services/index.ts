/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { getSchedules } from "./graphql";

class ScheduleService {
  private static instance: ScheduleService;

  private constructor() {}

  static getInstance(): ScheduleService {
    if (!ScheduleService.instance) {
      ScheduleService.instance = new ScheduleService();
    }
    return ScheduleService.instance;
  }

  async getScheduleAPI(day: string): Promise<any> {
    const res = await getSchedules(day);
    return res;
  }
}

export default ScheduleService.getInstance();
