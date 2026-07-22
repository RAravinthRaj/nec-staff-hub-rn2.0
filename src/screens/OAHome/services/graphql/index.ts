/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { apolloClient } from "../../../../clients";
import { getGraphqlError, getItemInLocalStorage } from "../../../../utils";
import { OA_HOME_CONFIG } from "../../config";
import { EXPORT_OA_ATTENDANCE_REPORT, SAVE_OA_ATTENDANCE } from "./mutations";
import {
  OA_ATTENDANCE_META,
  OA_ATTENDANCE_REPORT_STUDENTS,
  OA_ATTENDANCE_STUDENTS,
} from "./queries";

export interface OAFilters {
  department: string;
  year: string;
  startDate: string;
  endDate?: string;
  mode: "DAY" | "RANGE" | "PERIOD";
  periodId?: number;
  status?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface OAAttendanceStudentInput {
  student_id: number;
  status: "PRESENT" | "ABSENT" | "ON_DUTY";
  reason?: string;
}

export const getOAAttendanceMeta = async () => {
  try {
    const token = await getItemInLocalStorage("token");

    if (!token) {
      throw new Error("Unauthorized");
    }

    const { data }: any = await apolloClient.query({
      query: OA_ATTENDANCE_META,
      fetchPolicy: "no-cache",
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return {
      payload: data?.oaAttendanceMeta ?? null,
    };
  } catch (err: any) {
    const msg = getGraphqlError(err) || "An error occurred while fetching OA attendance filters.";
    throw new Error(msg);
  }
};

export const getOAAttendanceStudents = async (filters: OAFilters) => {
  try {
    const token = await getItemInLocalStorage("token");

    if (!token) {
      throw new Error("Unauthorized");
    }

    const { data }: any = await apolloClient.query({
      query: OA_ATTENDANCE_STUDENTS,
      variables: {
        department: filters.department,
        year: filters.year,
        startDate: filters.startDate,
        endDate: filters.endDate,
        mode: filters.mode,
        periodId: filters.periodId,
        status: filters.status || null,
        search: filters.search || null,
        page: filters.page ?? 1,
        pageSize: filters.pageSize ?? 10,
      },
      fetchPolicy: "no-cache",
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return {
      payload: data?.oaAttendanceStudents ?? null,
    };
  } catch (err: any) {
    const msg = getGraphqlError(err) || "An error occurred while fetching OA attendance students.";
    throw new Error(msg);
  }
};

export const getOAAttendanceReportStudents = async (filters: OAFilters) => {
  try {
    const token = await getItemInLocalStorage("token");

    if (!token) {
      throw new Error("Unauthorized");
    }

    const { data }: any = await apolloClient.query({
      query: OA_ATTENDANCE_REPORT_STUDENTS,
      variables: {
        department: filters.department,
        year: filters.year,
        startDate: filters.startDate,
        endDate: filters.endDate,
        mode: filters.mode,
        status: filters.status || null,
        search: filters.search || null,
        page: filters.page ?? 1,
        pageSize: filters.pageSize ?? 10,
      },
      fetchPolicy: "no-cache",
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return {
      payload: data?.oaAttendanceReportStudents ?? null,
    };
  } catch (err: any) {
    const msg =
      getGraphqlError(err) ||
      "An error occurred while fetching OA attendance report students.";
    throw new Error(msg);
  }
};

export const saveOAAttendance = async (
  filters: OAFilters,
  students: OAAttendanceStudentInput[],
) => {
  try {
    const token = await getItemInLocalStorage("token");

    if (!token) {
      throw new Error("Unauthorized");
    }

    const { data }: any = await apolloClient.mutate({
      mutation: SAVE_OA_ATTENDANCE,
      variables: {
        department: filters.department,
        year: filters.year,
        startDate: filters.startDate,
        endDate: filters.endDate,
        mode: filters.mode,
        periodId: filters.periodId,
        students,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return {
      payload: data?.saveOAAttendance ?? null,
    };
  } catch (err: any) {
    const rawMessage =
      getGraphqlError(err) || "An error occurred while saving OA attendance.";

    const hasKnownSqlSyntaxFailure =
      rawMessage.includes("You have an error in your SQL syntax") &&
      rawMessage.includes("ON DUPLICATE KEY UPDATE");

    const msg = hasKnownSqlSyntaxFailure
      ? OA_HOME_CONFIG.saveAttendanceServerSqlError
      : rawMessage;

    throw new Error(msg);
  }
};

export const exportOAAttendanceReport = async (filters: OAFilters) => {
  try {
    const token = await getItemInLocalStorage("token");

    if (!token) {
      throw new Error("Unauthorized");
    }

    const { data }: any = await apolloClient.mutate({
      mutation: EXPORT_OA_ATTENDANCE_REPORT,
      variables: {
        department: filters.department,
        year: filters.year,
        startDate: filters.startDate,
        endDate: filters.endDate,
        mode: filters.mode,
        status: filters.status || null,
        search: filters.search || null,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return {
      payload: data?.exportOAAttendanceReport ?? null,
    };
  } catch (err: any) {
    const msg = getGraphqlError(err) || "An error occurred while exporting OA attendance.";
    throw new Error(msg);
  }
};
