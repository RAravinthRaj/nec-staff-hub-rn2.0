/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import axios from "axios";
import { config } from "@/config";

export interface VerifyOtpParams {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  message: string;
  token: string;
  role: string;
}

export const verifyOtpAPI = async (
  params: VerifyOtpParams,
): Promise<VerifyOtpResponse> => {
  const res = await axios.post(
    `${config.restBaseURL}/verify-otp`,
    {
      email: params.email,
      otp: params.otp,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return res.data;
};
