/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { apolloClient } from "../../../../clients";
import {
  getGraphqlError,
  getItemInLocalStorage,
  normalizeDocuments,
} from "../../../../utils";
import { REQUEST_LEAVE } from "./mutations";

export const requestLeave = async (
  leaveType: "FULL_DAY" | "HALF_DAY",
  categoryId: number,
  startDate: string,
  endDate: string,
  reason: string,
  documents?: string[],
  force?: boolean,
) => {
  try {
    const token = await getItemInLocalStorage("token");

    if (!token) {
      throw new Error("Unauthorized");
    }

    const { data } = await apolloClient.mutate({
      mutation: REQUEST_LEAVE,
      variables: {
        leaveType,
        categoryId,
        startDate,
        endDate,
        reason,
        documents: normalizeDocuments(documents),
        force,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return {
      payload: data?.requestLeave ?? null,
    };
  } catch (err: any) {
    const msg = getGraphqlError(err) || "An error occurred while requesting leave.";
    throw new Error(msg);
  }
};
