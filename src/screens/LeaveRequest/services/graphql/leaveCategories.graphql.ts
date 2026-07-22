/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { apolloClient } from "../../../../clients";
import { getGraphqlError, getItemInLocalStorage } from "../../../../utils";
import { GET_LEAVE_CATEGORIES } from "./queries";

export const getLeaveCategories = async () => {
  try {
    const token = await getItemInLocalStorage("token");

    const { data } = await apolloClient.query({
      query: GET_LEAVE_CATEGORIES,
      fetchPolicy: "no-cache",
      context: {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
    });

    return {
      payload: data?.leaveCategories ?? [],
    };
  } catch (err: any) {
    const msg =
      getGraphqlError(err) || "An error occurred while fetching categories.";
    throw new Error(msg);
  }
};
