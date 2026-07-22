/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { apolloClient } from "../../../../clients";
import { getGraphqlError, getItemInLocalStorage } from "../../../../utils";
import { GET_COURSE_STUDENTS_DETAILS } from "./queries";

export const getCourseBatchStudents = async (
  courseBatchId: number,
  periodId: number,
  date: string,
) => {
  try {
    const token = await getItemInLocalStorage("token");

    if (!token) {
      throw new Error("Unauthorized");
    }

    const { data } = await apolloClient.query<any>({
      query: GET_COURSE_STUDENTS_DETAILS,
      variables: {
        courseBatchId,
        periodId,
        date,
      },
      fetchPolicy: "no-cache",
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return {
      payload: formatStudents(data?.getCourseBatchStudents),
    };
  } catch (err: any) {
    const msg =
      getGraphqlError(err) ||
      "An error occurred while fetching course batch students.";

    throw new Error(msg);
  }
};

const formatStudents = (data: any) => {
  return {
    totalStudentCount: data?.totalStudentCount ?? 0,
    presentCount: data?.presentCount ?? 0,
    absentCount: data?.absentCount ?? 0,
    odCount: data?.odCount ?? 0,

    students:
      data?.students?.map((item: any) => ({
        studentId: item.student_id,
        rollNumber: item.rollNumber,
        name: item.name,
        status: item.status,
      })) ?? [],
  };
};
