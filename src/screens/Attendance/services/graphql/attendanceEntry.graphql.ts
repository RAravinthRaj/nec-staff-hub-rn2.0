/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { apolloClient } from "../../../../clients";
import { getGraphqlError, getItemInLocalStorage } from "../../../../utils";
import { ATTENDANCE_ENTRY } from "./mutations";

export interface AttendanceEntryStudentInput {
  student_id: number;
  status: "PRESENT" | "ABSENT" | "ON_DUTY";
}

export const submitAttendanceEntry = async (
  periodId: number,
  date: string,
  students: AttendanceEntryStudentInput[],
) => {
  try {
    const token = await getItemInLocalStorage("token");

    if (!token) {
      throw new Error("Unauthorized");
    }

    const { data } = await apolloClient.mutate({
      mutation: ATTENDANCE_ENTRY,
      variables: {
        periodId,
        date,
        students,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return {
      payload: data?.attendanceEntry ?? null,
    };
  } catch (err: any) {
    const msg =
      getGraphqlError(err) || "An error occurred while saving attendance.";

    throw new Error(msg);
  }
};
