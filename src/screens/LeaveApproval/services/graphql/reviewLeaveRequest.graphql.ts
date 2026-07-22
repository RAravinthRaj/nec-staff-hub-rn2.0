/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { apolloClient } from "../../../../clients";
import { getGraphqlError, getItemInLocalStorage } from "../../../../utils";
import { REVIEW_LEAVE_REQUEST } from "./mutations";

export const reviewLeaveRequest = async (
  leaveId: number,
  status: "APPROVED" | "DECLINED",
  comments: string,
) => {
  try {
    const token = await getItemInLocalStorage("token");

    if (!token) {
      throw new Error("Unauthorized");
    }

    const { data } = await apolloClient.mutate({
      mutation: REVIEW_LEAVE_REQUEST,
      variables: { leaveId, status, comments },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return {
      payload: data?.reviewLeaveRequest ?? null,
    };
  } catch (err: any) {
    const msg =
      getGraphqlError(err) || "An error occurred while reviewing leave.";
    throw new Error(msg);
  }
};
