/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import axios from "axios";
import { config } from "../config";
import { useAuthStore } from "@/store/useAuthStore";
import * as SecureStore from "expo-secure-store";

const getRestBaseUrl = () => {
  let url = config.restBaseURL || "http://localhost:8000/rest";
  return url.replace(/\/+$/, "");
};

const restClient = axios.create({
  baseURL: getRestBaseUrl(),
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

restClient.interceptors.request.use(async (reqConfig) => {
  let token = useAuthStore.getState().token;
  if (!token) {
    token = await SecureStore.getItemAsync("userToken");
  }
  if (token) {
    reqConfig.headers.Authorization = `Bearer ${token}`;
  }
  return reqConfig;
});

export const AuthApi = {
  sendOTP: async (email: string) => {
    const res = await restClient.post("/send-otp", { email });
    return res.data;
  },

  verifyOTP: async (email: string, otp: string) => {
    const res = await restClient.post("/verify-otp", { email, otp });
    return res.data;
  },

  googleLogin: async (payload: { googleToken?: string; idToken?: string; email?: string }) => {
    const res = await restClient.post("/google-login", payload);
    return res.data;
  },

  getTimetable: async (dayOfWeek: string) => {
    const res = await restClient.get(`/timetable?day=${dayOfWeek.toUpperCase()}`);
    return res.data;
  },

  getStudentsForAttendance: async (courseId: number, sectionId: number, date?: string, periodNumber?: number) => {
    let url = `/students-for-attendance?courseId=${courseId}&sectionId=${sectionId}`;
    if (date) url += `&date=${date}`;
    if (periodNumber) url += `&periodNumber=${periodNumber}`;
    const res = await restClient.get(url);
    return res.data;
  },

  submitAttendance: async (payload: {
    courseId: number;
    sectionId: number;
    periodNumber: number;
    attendanceDate: string;
    records: Array<{ regno?: string; registerNumber?: string; status: string }>;
  }) => {
    const res = await restClient.post("/submit-attendance", payload);
    return res.data;
  },

  copyAttendance: async (params: {
    targetDate: string;
    targetPeriodNumber: number;
    currentCourseId: number;
    currentSectionId: number;
  }) => {
    const { targetDate, targetPeriodNumber, currentCourseId, currentSectionId } = params;
    const res = await restClient.get(
      `/copy-attendance?targetDate=${targetDate}&targetPeriodNumber=${targetPeriodNumber}&currentCourseId=${currentCourseId}&currentSectionId=${currentSectionId}`
    );
    return res.data;
  },

  filterAttendanceRecords: async (params: Record<string, any>) => {
    const queryStr = new URLSearchParams(params).toString();
    const res = await restClient.get(`/filter-attendance-records?${queryStr}`);
    return res.data;
  },
};
