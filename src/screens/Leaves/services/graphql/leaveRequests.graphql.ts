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
import { GET_LEAVE_REQUESTS } from "./queries";

export const getLeaveRequests = async (status?: string) => {
  try {
    const token = await getItemInLocalStorage("token");

    if (!token) {
      throw new Error("Unauthorized");
    }

    const { data } = await apolloClient.query({
      query: GET_LEAVE_REQUESTS,
      variables: {
        status,
      },
      fetchPolicy: "no-cache",
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return {
      payload: formatLeaveRequests(data?.leaveRequests ?? []),
    };
  } catch (err: any) {
    const msg =
      getGraphqlError(err) || "An error occurred while fetching leave requests.";
    throw new Error(msg);
  }
};

const formatLeaveRequests = (items: any[]) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatDate = (value?: string) => {
    const ms = Number(value);
    if (!ms) return "";
    const d = new Date(ms);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const formatStatus = (value?: string) => {
    const lower = (value || "").toLowerCase();
    if (!lower) return value;
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const formatType = (value?: string) => {
    const upper = (value || "").toUpperCase();
    if (upper === "FULL_DAY") return "Full-Day";
    if (upper === "HALF_DAY") return "Half-Day";
    return value;
  };

  const grouped: Record<string, any[]> = {};

  for (const item of items) {
    const startDate = formatDate(item?.start_date);
    const endDate = formatDate(item?.end_date);

    const dateForKey = Number(item?.start_date);
    const keyDate = dateForKey ? new Date(dateForKey) : new Date();
    const key = `${months[keyDate.getMonth()]} ${keyDate.getFullYear()}`;

    if (!grouped[key]) grouped[key] = [];

    grouped[key].push({
      id: item?.id,
      status: formatStatus(item?.status),
      applicationDate: formatDate(item?.created_at),
      startDate,
      endDate,
      numberOfDays: null,
      category: item?.category_name || `Category ${item?.category_id ?? ""}`.trim(),
      type: formatType(item?.leave_type),
      reason: item?.reason ?? "",
      comments: "",
      documents: normalizeDocuments(item?.documents),
    });
  }

  return grouped;
};
