/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { Loader, NoDataFound, PageContainer } from "@/components";
import { Body, CustomModal, Header, StudentList } from "./components";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useAttendanceStore, useSubmitAttendanceStore } from "./stores";
import { showToast } from "@/utils";
import { ATTENDANCE_CONFIG } from "./config";

export const AttendanceScreen = ({ navigation, route }: any) => {
  const {
    course_batch_id,
    period_id,
    date,
    courseBatchId: legacyCourseBatchId,
    periodId: legacyPeriodId,
  } = route.params || {};

  const resolvedCourseBatchId = course_batch_id ?? legacyCourseBatchId;
  const resolvedPeriodId = period_id ?? legacyPeriodId;

  const {
    attendance,
    fetchAttendanceStudents,
    resetAttendance,
    attendanceError,
    attendanceLoading,
  } = useAttendanceStore();

  const { submitAttendance, submitLoading, submitError, resetSubmitAttendance } =
    useSubmitAttendanceStore();

  const [allStudents, setAllStudents] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const [details, setDetails] = useState({
    totalStudents: 0,
    present: 0,
    absent: 0,
    onDuty: 0,
  });

  useEffect(() => {
    if (!resolvedCourseBatchId || !date) return;

    resetAttendance();
    if (!resolvedPeriodId) return;

    fetchAttendanceStudents(
      Number(resolvedCourseBatchId),
      Number(resolvedPeriodId),
      date,
    );
  }, []);

  useEffect(() => {
    if (attendance) {
      setStudents(attendance.students);
      setAllStudents(attendance.students);
    }
  }, [attendance]);

  const _isOnDuty = (status: string) => {
    const normalized = (status || "").toLowerCase();
    return normalized === "od" || normalized === "onduty" || normalized === "on_duty";
  };

  useEffect(() => {
    const present = allStudents.filter((s) => s.status === "present").length;
    const absent = allStudents.filter((s) => s.status === "absent").length;
    const onDuty = allStudents.filter((s) => _isOnDuty(s.status)).length;

    setDetails({
      totalStudents: allStudents.length,
      present,
      absent,
      onDuty,
    });
  }, [allStudents]);

  useEffect(() => {
    if (attendanceError && attendanceError.length > 0) {
      showToast(attendanceError, "error");
    }
  }, [attendanceError]);

  useEffect(() => {
    if (submitError && submitError.length > 0) {
      showToast(submitError, "error");
      resetSubmitAttendance();
    }
  }, [submitError, resetSubmitAttendance]);

  const _retryFetchStudents = () => {
    if (!resolvedCourseBatchId || !resolvedPeriodId || !date) return;

    resetAttendance();
    fetchAttendanceStudents(
      Number(resolvedCourseBatchId),
      Number(resolvedPeriodId),
      date,
    );
  };

  const _navigateToBack = () => {
    return navigation.goBack();
  };

  const markAllPresent = () => {
    const updated = students.map((s) =>
      _isOnDuty(s.status) ? s : { ...s, status: "present" },
    );

    setStudents(updated);
    setAllStudents(updated);
  };

  const markAllAbsent = () => {
    const updated = students.map((s) =>
      _isOnDuty(s.status) ? s : { ...s, status: "absent" },
    );

    setStudents(updated);
    setAllStudents(updated);
  };

  const _handleStatusChange = (studentId: number, status: string) => {
    const updated = students.map((s) =>
      s.studentId === studentId ? { ...s, status } : s,
    );

    setStudents(updated);

    const updatedAll = allStudents.map((s) =>
      s.studentId === studentId ? { ...s, status } : s,
    );

    setAllStudents(updatedAll);
  };

  const searchStudents = (query: string) => {
    const q = query.toLowerCase().trim();

    if (!q) {
      setStudents(allStudents);
      return;
    }

    const filtered = allStudents.filter(
      (s) =>
        s.name.toLowerCase().includes(q) || s.rollNumber.toString().includes(q),
    );

    setStudents(filtered);
  };

  const _mapStatusForApi = (
    status: string,
  ): "PRESENT" | "ABSENT" | "ON_DUTY" => {
    const normalized = (status || "").toLowerCase();

    if (normalized === "present") return "PRESENT";
    if (normalized === "absent") return "ABSENT";
    if (_isOnDuty(normalized)) {
      return "ON_DUTY";
    }

    return "ABSENT";
  };

  const _isFutureDate = (value: string) => {
    const [dayStr, monthStr, yearStr] = value.split(".");
    const day = Number(dayStr);
    const month = Number(monthStr);
    const year = Number(yearStr);

    if (!day || !month || !year) return false;

    const selected = new Date(year, month - 1, day);
    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    return selected.getTime() > todayStart.getTime();
  };

  const _submitAttendance = async () => {
    if (submitLoading) return;

    if (!resolvedPeriodId) {
      showToast("Missing period id.", "error");
      return;
    }

    if (!date) {
      showToast("Missing date.", "error");
      return;
    }

    if (_isFutureDate(date)) {
      showToast("Attendance cannot be saved for a future date.", "error");
      return;
    }

    const sourceStudents = allStudents.length > 0 ? allStudents : students;
    if (!sourceStudents.length) {
      showToast("No students to submit.", "error");
      return;
    }

    const payloadStudents = sourceStudents.map((s) => ({
      student_id: Number(s.studentId),
      status: _mapStatusForApi(s.status),
    }));

    try {
      await submitAttendance(
        Number(resolvedPeriodId),
        date,
        payloadStudents,
      );
      showToast("Attendance saved successfully.", "success");
    } catch (err: any) {
      showToast(err?.message || "Failed to save attendance.", "error");
    }
  };

  const _renderAttendance = () => {
    if (attendanceLoading) {
      return <Loader />;
    }

    return (
      <ScrollView>
        <Body
          statsData={details}
          markAllPresent={markAllPresent}
          markAllAbsent={markAllAbsent}
          searchStudents={searchStudents}
        />

        {students.length === 0 ? (
          <NoDataFound
            title={ATTENDANCE_CONFIG.NoDataFound}
            buttonTitle={ATTENDANCE_CONFIG.retry}
            onPress={_retryFetchStudents}
          />
        ) : (
          <StudentList
            studentsData={students}
            onStatusChange={_handleStatusChange}
          />
        )}
      </ScrollView>
    );
  };

  return (
    <>
      <Header
        goBack={_navigateToBack}
        onSave={() => setConfirmVisible(true)}
      />

      <PageContainer isLightStatusBar={true}>
        {_renderAttendance()}
      </PageContainer>

      {confirmVisible && (
        <CustomModal
          visible={confirmVisible}
          setVisible={setConfirmVisible}
          onConfirm={_submitAttendance}
        />
      )}

      {submitLoading && <Loader useModalLoader />}
    </>
  );
};
