/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { apolloClient } from "../../../../clients";
import { getGraphqlError, getItemInLocalStorage } from "../../../../utils";
import { GET_PROFILE } from "./queries";
import { useAuthStore } from "@/store/useAuthStore";
import * as SecureStore from "expo-secure-store";

export const getProfile = async () => {
  try {
    let token = useAuthStore.getState().token;
    if (!token) {
      token = await SecureStore.getItemAsync("userToken");
    }
    if (!token) {
      token = await getItemInLocalStorage("token");
    }

    if (token && token.length > 0) {
      const { data } = await apolloClient.query<any>({
        query: GET_PROFILE,
        fetchPolicy: "no-cache",
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      return {
        payload: {
          profile: formatProfile(data?.getProfile),
        },
      };
    }

    throw new Error("Unauthorized");
  } catch (err: any) {
    let msg = getGraphqlError(err) || "An error occurred while fetching profile.";
    console.error("Error in getProfile: ", msg);
    throw new Error(msg);
  }
};

const formatProfile = (profile: any) => {
  if (!profile) return null;

  return {
    id: profile?.staffId || profile?.userId,
    user_id: profile?.userId,
    name: profile?.name || "",
    email: profile?.email || "",
    phone_no: profile?.mobileNumber || "",
    roll_no: profile?.rollNumber || "",
    date_of_birth: profile?.dob || null,
    profile_image: profile?.profileImage || null,
    designation: profile?.designation || "",
    gender: profile?.gender || "Male",
  };
};
