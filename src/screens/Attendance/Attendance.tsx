/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { Loader, NoDataFound, PageContainer } from "@/components";
import { Body, CustomModal, Header, StudentList } from "./components";
import { ScrollView, View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useAttendanceStore, useSubmitAttendanceStore } from "./stores";
import { showToast } from "@/utils";
import { ATTENDANCE_CONFIG } from "./config";
import { AuthApi } from "@/services/authApi";
import dayjs from "dayjs";
import { useTheme } from "@rneui/themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Fonts } from "@/assets";

export const AttendanceScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const {
    course_batch_id,
    period_id,
    date,
    courseId: legacyCourseId,
    sectionId: legacySectionId,
    courseBatchId: legacyCourseBatchId,
    periodId: legacyPeriodId,
  } = route.params || {};

  const resolvedCourseBatchId = course_batch_id ?? legacyCourseBatchId ?? 1;
  const resolvedPeriodId = period_id ?? legacyPeriodId ?? 1;
  const resolvedCourseId = legacyCourseId ?? resolvedCourseBatchId ?? 1;
  const resolvedSectionId = legacySectionId ?? 1;

  const {
    attendance,
    fetchAttendanceStudents,
    resetAttendance,
    attendanceError,
    attendanceLoading,
  } = useAttendanceStore();

  const [allStudents, setAllStudents] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Copy Attendance Modal state
  const [copyModalVisible, setCopyModalVisible] = useState(false);
  const [targetCopyDate, setTargetCopyDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [targetCopyPeriod, setTargetCopyPeriod] = useState(1);
  const [copyLoading, setCopyLoading] = useState(false);

  const [details, setDetails] = useState({
    totalStudents: 0,
    present: 0,
    absent: 0,
    onDuty: 0,
  });

  useEffect(() => {
    if (!resolvedCourseBatchId || !date) return;

    resetAttendance();
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

  const _retryFetchStudents = () => {
    if (!resolvedCourseBatchId || !resolvedPeriodId || !date) return;

    resetAttendance();
    fetchAttendanceStudents(
      Number(resolvedCourseBatchId),
      Number(resolvedPeriodId),
      date,
    );
  };

  const _navigateToBack = () => navigation.goBack();

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
    const currentStudent = students.find((s) => s.studentId === studentId);
    if (currentStudent && _isOnDuty(currentStudent.status)) {
      showToast("On-Duty status cannot be modified by staff", "error");
      return;
    }

    const updated = students.map((s) =>
      s.studentId === studentId ? { ...s, status } : s,
    );
    setStudents(updated);
    setAllStudents(updated);
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

  const _isFutureDate = (val: string) => {
    let dateStr = val;
    if (val.includes(".")) {
      const parts = val.split(".");
      dateStr = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dayjs(dateStr).isAfter(dayjs(), "day");
  };

  const _submitAttendance = async () => {
    if (submitting) return;

    const formattedDate = date ? (date.includes(".") ? date.split(".").reverse().join("-") : date) : dayjs().format("YYYY-MM-DD");

    if (_isFutureDate(formattedDate)) {
      showToast("Attendance date cannot be in the future", "error");
      return;
    }

    const sourceStudents = allStudents.length > 0 ? allStudents : students;
    if (!sourceStudents.length) {
      showToast("No students to submit.", "error");
      return;
    }

    try {
      setSubmitting(true);
      const records = sourceStudents.map((s) => ({
        regno: String(s.rollNumber || s.studentId),
        status: _isOnDuty(s.status) ? "OD" : s.status === "present" ? "P" : "A",
      }));

      await AuthApi.submitAttendance({
        courseId: Number(resolvedCourseId),
        sectionId: Number(resolvedSectionId),
        periodNumber: Number(resolvedPeriodId),
        attendanceDate: formattedDate,
        records,
      });

      showToast("Attendance saved successfully", "success");
      setConfirmVisible(false);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Failed to save attendance";
      showToast(msg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const _handleCopyAttendance = async () => {
    if (copyLoading) return;

    try {
      setCopyLoading(true);
      const res = await AuthApi.copyAttendance({
        targetDate: targetCopyDate,
        targetPeriodNumber: Number(targetCopyPeriod),
        currentCourseId: Number(resolvedCourseId),
        currentSectionId: Number(resolvedSectionId),
      });

      const copiedStudents = res?.students || [];
      if (copiedStudents.length === 0) {
        showToast("No attendance records found for target period", "error");
        return;
      }

      const updated = students.map((s) => {
        const match = copiedStudents.find((c: any) => String(c.regno || c.registerNumber) === String(s.rollNumber || s.studentId));
        if (match) {
          return { ...s, status: match.status.toLowerCase() };
        }
        return s;
      });

      setStudents(updated);
      setAllStudents(updated);
      setCopyModalVisible(false);
      showToast("Attendance statuses copied. Tap Save to submit.", "success");
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Course or section does not match the current period";
      showToast(msg, "error");
    } finally {
      setCopyLoading(false);
    }
  };

  const _renderCopyModal = () => (
    <Modal visible={copyModalVisible} transparent animationType="fade" onRequestClose={() => setCopyModalVisible(false)}>
      <View style={modalStyles.overlay}>
        <View style={[modalStyles.card, { backgroundColor: theme.colors.white }]}>
          <View style={modalStyles.header}>
            <Text style={[modalStyles.title, { color: theme.colors.black }]}>Copy Attendance</Text>
            <TouchableOpacity onPress={() => setCopyModalVisible(false)}>
              <FontAwesome name="times-circle" size={24} color={theme.colors.grey2} />
            </TouchableOpacity>
          </View>

          <Text style={modalStyles.label}>Target Date (YYYY-MM-DD):</Text>
          <TouchableOpacity
            style={modalStyles.input}
            onPress={() => setTargetCopyDate(dayjs().subtract(1, "day").format("YYYY-MM-DD"))}
          >
            <Text style={{ fontSize: 15, color: theme.colors.black }}>{targetCopyDate}</Text>
          </TouchableOpacity>

          <Text style={[modalStyles.label, { marginTop: 12 }]}>Period Number (1 - 12):</Text>
          <View style={modalStyles.periodRow}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <TouchableOpacity
                key={num}
                onPress={() => setTargetCopyPeriod(num)}
                style={[
                  modalStyles.periodChip,
                  {
                    backgroundColor: targetCopyPeriod === num ? theme.colors.primary : theme.colors.secondaryBackground,
                  },
                ]}
              >
                <Text style={{ color: targetCopyPeriod === num ? "#FFF" : "#000", fontWeight: "bold" }}>P{num}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={_handleCopyAttendance}
            style={[modalStyles.copyButton, { backgroundColor: theme.colors.primary }]}
          >
            <Text style={modalStyles.copyButtonText}>Copy Statuses</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

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
          openCopyModal={() => setCopyModalVisible(true)}
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

      {_renderCopyModal()}

      {confirmVisible && (
        <CustomModal
          visible={confirmVisible}
          setVisible={setConfirmVisible}
          onConfirm={_submitAttendance}
        />
      )}

      {(submitting || copyLoading) && <Loader useModalLoader />}
    </>
  );
};

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "90%",
    borderRadius: 20,
    padding: 18,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.semibold,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.semibold,
    color: "#555",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 12,
  },
  periodRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6,
    marginBottom: 16,
  },
  periodChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  copyButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  copyButtonText: {
    color: "#FFF",
    fontFamily: Fonts.semibold,
    fontSize: 16,
  },
});
