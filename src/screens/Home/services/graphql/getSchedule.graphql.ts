/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
/*
© 2025 Aravinth Raj R. All rights reserved.
*/

import { apolloClient } from "../../../../clients";
import { getGraphqlError, getItemInLocalStorage } from "../../../../utils";
import { GET_SCHEDULES } from "./queries";

export const getSchedules = async (day: string) => {
  try {
    const token = await getItemInLocalStorage("token");
    if (!token) {
      throw new Error("Unauthorized");
    }

    const { data } = await apolloClient.query<any>({
      query: GET_SCHEDULES,
      variables: { day },
      fetchPolicy: "no-cache",
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return {
      payload: {
        schedules: formatSchedules(data?.getTimetable || []),
      },
    };
  } catch (err: any) {
    const msg =
      getGraphqlError(err) || "An error occurred while fetching schedules.";

    console.error("Error in getSchedules:", msg);
    throw new Error(msg);
  }
};

const formatSchedules = (timetables: any[]) => {
  return timetables.map((item) => ({
    id: item.id,

    courseBatchId: item.course_batch_id ?? null,
    periodId: item.period?.id ?? null,
    subName: `${item.courseBatch?.course?.course_code ?? ""} - ${
      item.courseBatch?.course?.course_name ?? ""
    }`,
    courseName: item.courseBatch?.course?.course_name,
    courseCode: item.courseBatch?.course?.course_code,

    batch: item.courseBatch?.batch?.batch ?? "",
    year: item.year?.year ?? "",
    faculty: item.staff?.name ?? "",
    semester: item.semester?.semester ?? "",

    startTime: item.period?.start_time,
    endTime: item.period?.end_time,
  }));
};
