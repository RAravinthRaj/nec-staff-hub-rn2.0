/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { PageContainer, Loader } from "@/components";
import { Body, Header, Schedules } from "./components";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { showToast } from "@/utils";
import { AuthApi } from "@/services/authApi";

export const HomeScreen = ({ navigation }: any) => {
  const today = dayjs().format("YYYY-MM-DD");
  const [date, setDate] = useState(today);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTimetable = async (selectedDate: string) => {
    const d = dayjs(selectedDate);
    const dayIndex = d.day(); // 0 is Sunday
    if (dayIndex === 0) {
      setSchedules([]);
      return;
    }

    const dayMap = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const dayOfWeek = dayMap[dayIndex];

    try {
      setLoading(true);
      const res = await AuthApi.getTimetable(dayOfWeek);
      setSchedules(res?.schedules || []);
    } catch (err: any) {
      // Fallback silently if offline or error occurs
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetable(date);
  }, [date]);

  const _navigateToAttendance = (courseBatchId: number, periodId: number, item?: any) => {
    navigation.navigate("Attendance", {
      courseBatchId: courseBatchId || item?.id || 1,
      periodId: periodId || item?.periodId || 1,
      courseId: item?.courseId || 1,
      sectionId: item?.sectionId || 1,
      course_batch_id: courseBatchId,
      period_id: periodId,
      date: dayjs(date).format("DD.MM.YYYY"),
    });
  };

  const _navigateToNotification = () => {
    navigation.navigate("Notification");
  };

  const _retryFetchSchedules = () => {
    fetchTimetable(date);
  };

  const _renderSchedules = () => {
    return (
      <ScrollView>
        <Schedules
          date={date}
          data={schedules}
          navigateToAttendance={_navigateToAttendance}
          retryFetchStudents={_retryFetchSchedules}
        />
      </ScrollView>
    );
  };

  return (
    <>
      <Header
        navigateToNotification={_navigateToNotification}
        showBadge={false}
      />
      <Body setDate={setDate} />
      <PageContainer isLightStatusBar={true}>
        {loading ? <Loader /> : _renderSchedules()}
      </PageContainer>
    </>
  );
};
