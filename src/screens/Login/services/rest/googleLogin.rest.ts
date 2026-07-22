/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import axios from "axios";
import { config } from "@/config";

export interface GoogleLoginParams {
  email: string;
}

export interface GoogleLoginResponse {
  message: string;
  token: string;
  role: string;
}

export const googleLoginAPI = async (
  params: GoogleLoginParams,
): Promise<GoogleLoginResponse> => {
  const res = await axios.post(
    `${config.restBaseURL}/google-login`,
    { email: params.email },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return res.data;
};
