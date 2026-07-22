/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { apolloClient } from "../../../../clients";
import { getGraphqlError, getItemInLocalStorage } from "../../../../utils";
import { GET_PROFILE } from "./queries";

export const getProfile = async () => {
  try {
    const token = await getItemInLocalStorage("token");

    if (token && token.length > 0) {
      const { data } = await apolloClient.query({
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
    let msg =
      getGraphqlError(err) || "An error occurred while fetching profile.";

    console.error("Error in getProfile: ", msg);
    throw new Error(msg);
  }
};

const formatProfile = (profile: any) => {
  if (!profile) return null;

  return {
    name: profile?.name ?? "",

    designation: profile?.designation
      ? `${profile.designation}${
          profile?.department?.abbreviation
            ? `, Dept of ${profile.department.abbreviation}`
            : ""
        }`
      : "",

    gender: profile?.gender ?? "",

    email: profile?.email ?? "",

    phone: profile?.phone_no ?? "",

    rollNumber: profile?.roll_no ? profile.roll_no.toString() : "",

    birthday: profile?.date_of_birth
      ? new Date(Number(profile.date_of_birth)).toISOString().split("T")[0]
      : null,
  };
};
