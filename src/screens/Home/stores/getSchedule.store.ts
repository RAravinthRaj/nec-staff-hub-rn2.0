import { create } from "zustand";
import ScheduleService from "../services";

export interface Period {
  id: string;
  period_number: string;
  start_time: string;
  end_time: string;
  created_at?: string;
  updated_at?: string;
}

export interface Course {
  id: string;
  course_code: string;
  course_name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Batch {
  id: string;
  batch: string;
  created_at?: string;
  updated_at?: string;
}

export interface CourseBatch {
  id: string;
  created_at?: string;
  updated_at?: string;
  course: Course;
  batch: Batch;
}

export interface Semester {
  id: string;
  semester: string;
  created_at?: string;
  updated_at?: string;
}

export interface Year {
  id: string;
  year: string;
  created_at?: string;
  updated_at?: string;
}

export interface Staff {
  id: string;
  user_id: string;
  email: string;
  name: string;
  roll_no: string;
  phone_no?: string | null;
  profile_image?: string | null;
  date_of_birth?: string | null;
  designation: string;
  gender: string;
  created_at?: string;
  updated_at?: string;
}

export interface Schedule {
  id: string;
  day_of_week: string;
  status: string;

  course_batch_id: number;

  created_at?: string;
  updated_at?: string;

  period: Period;
  courseBatch: CourseBatch;
  semester: Semester;
  year: Year;
  staff: Staff;
}

export interface ScheduleState {
  schedules: Schedule[];
  scheduleLoading: boolean;
  scheduleError: string | null;

  fetchSchedules: (day: string) => Promise<void>;
  resetSchedules: () => void;
}

export const useScheduleStore = create<ScheduleState>((set) => ({
  schedules: [],
  scheduleLoading: false,
  scheduleError: null,

  fetchSchedules: async (day: string) => {
    set({ scheduleLoading: true, scheduleError: null });

    try {
      const res = await ScheduleService.getScheduleAPI(day);

      set({
        schedules: res?.payload?.schedules ?? [],
      });
    } catch (err: any) {
      set({
        scheduleError: err?.message || "Failed to fetch schedules",
      });
    } finally {
      set({ scheduleLoading: false });
    }
  },

  resetSchedules: () => {
    set({
      schedules: [],
      scheduleLoading: false,
      scheduleError: null,
    });
  },
}));
