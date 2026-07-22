/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import axios from "axios";
import { config } from "@/config";

export interface SendOtpParams {
  email: string;
}

export interface SendOtpResponse {
  message: string;
  rawOtp?: string;
}

export const sendOtpAPI = async (
  params: SendOtpParams,
): Promise<SendOtpResponse> => {
  try {
    const res = await axios.post(`${config.restBaseURL}/send-otp`, params, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err: any) {
    const msg =
      err?.response?.data?.message || err?.message || "Failed to send OTP";
    throw new Error(msg);
  }
};
