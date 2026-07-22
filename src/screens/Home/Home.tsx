/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { PageContainer } from "@/components";
import { Body, Header, Schedules } from "./components";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { ScrollView } from "react-native";
import { showToast } from "@/utils";

const MOCK_SCHEDULES = [
  {
    id: 1,
    courseCode: "CS101",
    courseName: "Data Structures",
    subName: "Data Structures",
    startTime: "09:00:00",
    endTime: "10:00:00",
    batch: "CSE A",
    year: "II",
    faculty: "R. Aravinth Raj",
    semester: "III",
    courseBatchId: 101,
    periodId: 1,
  },
  {
    id: 2,
    courseCode: "CS204",
    courseName: "Operating Systems",
    subName: "Operating Systems",
    startTime: "11:00:00",
    endTime: "12:00:00",
    batch: "CSE B",
    year: "III",
    faculty: "R. Aravinth Raj",
    semester: "V",
    courseBatchId: 204,
    periodId: 3,
  },
  {
    id: 3,
    courseCode: "CS310",
    courseName: "Mobile App Development",
    subName: "Mobile App Development",
    startTime: "14:00:00",
    endTime: "15:00:00",
    batch: "CSE A",
    year: "IV",
    faculty: "R. Aravinth Raj",
    semester: "VII",
    courseBatchId: 310,
    periodId: 6,
  },
];

export const HomeScreen = ({ navigation }: any) => {
  const today = dayjs().format("YYYY-MM-DD");
  const [date, setDate] = useState(today);
  const schedules = useMemo(
    () => (dayjs(date).day() === 0 ? [] : MOCK_SCHEDULES),
    [date],
  );

  const _navigateToAttendance = (courseBatchId: number, periodId: number) => {
    navigation.navigate("Attendance", {
      courseBatchId,
      periodId,
      course_batch_id: courseBatchId,
      period_id: periodId,
      date: dayjs(date).format("DD.MM.YYYY"),
    });
  };

  const _navigateToNotification = () => {
    navigation.navigate("Notification");
  };

  const _retryFetchSchedules = () => {
    showToast("Showing local schedule data.", "info");
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
        {_renderSchedules()}
      </PageContainer>
    </>
  );
};
