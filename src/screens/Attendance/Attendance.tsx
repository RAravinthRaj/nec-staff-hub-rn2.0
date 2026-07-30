/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { Loader, NoDataFound, PageContainer } from "@/components";
import { Body, CustomModal, Header, StudentList } from "./components";
import {
  ScrollView,
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { useAttendanceStore, useSubmitAttendanceStore } from "./stores";
import { showToast } from "@/utils";
import { ATTENDANCE_CONFIG } from "./config";
import { AuthApi } from "@/services/authApi";
import dayjs from "dayjs";
import { useTheme } from "@rneui/themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Fonts } from "@/assets";
import { Calendar } from "react-native-calendars";

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

  const [copyModalVisible, setCopyModalVisible] = useState(false);
  const [targetCopyDate, setTargetCopyDate] = useState(
    dayjs().subtract(1, "day").format("YYYY-MM-DD"),
  );
  const [targetCopyPeriod, setTargetCopyPeriod] = useState(1);
  const [copyLoading, setCopyLoading] = useState(false);
  const [showCalendarPicker, setShowCalendarPicker] = useState(false);

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
    return (
      normalized === "od" || normalized === "onduty" || normalized === "on_duty"
    );
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

  const _handleMarkAll = (type: "present" | "absent") => {
    const updated = students.map((item) => {
      if (_isOnDuty(item.status)) {
        return item; // Lock OD status
      }
      return { ...item, status: type };
    });

    setStudents(updated);
    setAllStudents(updated);
  };

  const _handleSingleChange = (id: number) => {
    const updated = students.map((item) => {
      if (item.studentId === id) {
        if (_isOnDuty(item.status)) {
          return item; // Lock OD status
        }
        return {
          ...item,
          status: item.status === "present" ? "absent" : "present",
        };
      }
      return item;
    });

    setStudents(updated);
    setAllStudents(updated);
  };

  const _handleSearch = (text: string) => {
    if (!text.trim()) {
      setStudents(allStudents);
      return;
    }

    const filtered = allStudents.filter(
      (s) =>
        s.name.toLowerCase().includes(text.toLowerCase()) ||
        String(s.rollNumber).toLowerCase().includes(text.toLowerCase()),
    );
    setStudents(filtered);
  };

  const _isFutureDate = (checkDateStr: string) => {
    const todayStr = dayjs().format("YYYY-MM-DD");
    return checkDateStr > todayStr;
  };

  const _submitAttendance = async () => {
    if (submitting) return;

    const formattedDate = date
      ? date.includes(".")
        ? date.split(".").reverse().join("-")
        : date
      : dayjs().format("YYYY-MM-DD");

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
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to save attendance";
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

      const copiedStudents = Array.isArray(res) ? res : res?.records || res?.students || [];
      if (copiedStudents.length === 0) {
        showToast("No attendance records found for target date & period", "error");
        return;
      }

      const updated = students.map((s) => {
        const match = copiedStudents.find(
          (c: any) =>
            String(c.regno || c.registerNumber) ===
            String(s.rollNumber || s.studentId),
        );
        if (match) {
          const rawStatus = (match.status || "absent").toLowerCase();
          const normalized = rawStatus === "p" ? "present" : rawStatus === "a" ? "absent" : rawStatus;
          return { ...s, status: normalized };
        }
        return s;
      });

      setStudents(updated);
      setAllStudents(updated);
      setCopyModalVisible(false);
      showToast("Attendance copied successfully. Tap Save to submit.", "success");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Course or section does not match the current period";
      showToast(msg, "error");
    } finally {
      setCopyLoading(false);
    }
  };

  const _renderCopyModal = () => (
    <Modal
      visible={copyModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setCopyModalVisible(false)}
    >
      <View style={modalStyles.overlay}>
        <View
          style={[modalStyles.card, { backgroundColor: theme.colors.white }]}
        >
          <View style={modalStyles.header}>
            <Text style={[modalStyles.title, { color: theme.colors.black }]}>
              Copy Attendance
            </Text>
            <TouchableOpacity onPress={() => setCopyModalVisible(false)}>
              <FontAwesome
                name="times-circle"
                size={24}
                color={theme.colors.grey2}
              />
            </TouchableOpacity>
          </View>

          <Text style={modalStyles.label}>Select Source Date:</Text>
          <TouchableOpacity
            style={[modalStyles.dateInputContainer, { borderColor: theme.colors.border }]}
            onPress={() => setShowCalendarPicker(true)}
          >
            <FontAwesome name="calendar" size={18} color={theme.colors.primary} style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 15, color: theme.colors.black, flex: 1, fontFamily: Fonts.regular }}>
              {targetCopyDate}
            </Text>
            <FontAwesome name="chevron-down" size={14} color={theme.colors.grey3} />
          </TouchableOpacity>

          <Text style={[modalStyles.label, { marginTop: 14 }]}>
            Choose Target Period:
          </Text>
          <View style={modalStyles.periodRow}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <TouchableOpacity
                key={num}
                onPress={() => setTargetCopyPeriod(num)}
                style={[
                  modalStyles.periodChip,
                  {
                    backgroundColor:
                      targetCopyPeriod === num
                        ? theme.colors.primary
                        : theme.colors.tertiaryBackground,
                    borderColor:
                      targetCopyPeriod === num
                        ? theme.colors.primary
                        : theme.colors.border,
                    borderWidth: 1,
                  },
                ]}
              >
                <Text
                  style={{
                    color: targetCopyPeriod === num ? "#FFF" : theme.colors.black,
                    fontFamily: Fonts.semibold,
                    fontSize: 13,
                  }}
                >
                  Period {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={_handleCopyAttendance}
            disabled={copyLoading}
            style={[
              modalStyles.copyButton,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <Text style={modalStyles.copyButtonText}>
              {copyLoading ? "Checking & Copying..." : "Copy Attendance"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Date Calendar Picker Dialog */}
        {showCalendarPicker && (
          <Modal
            transparent
            animationType="fade"
            visible={showCalendarPicker}
            onRequestClose={() => setShowCalendarPicker(false)}
          >
            <View style={modalStyles.overlay}>
              <View style={[modalStyles.card, { backgroundColor: theme.colors.white }]}>
                <View style={modalStyles.header}>
                  <Text style={[modalStyles.title, { color: theme.colors.black }]}>
                    Select Date
                  </Text>
                  <TouchableOpacity onPress={() => setShowCalendarPicker(false)}>
                    <FontAwesome name="times-circle" size={24} color={theme.colors.grey2} />
                  </TouchableOpacity>
                </View>
                <Calendar
                  current={targetCopyDate}
                  maxDate={dayjs().format("YYYY-MM-DD")}
                  onDayPress={(day: any) => {
                    setTargetCopyDate(day.dateString);
                    setShowCalendarPicker(false);
                  }}
                  markedDates={{
                    [targetCopyDate]: {
                      selected: true,
                      selectedColor: theme.colors.primary,
                    },
                  }}
                  theme={{
                    selectedDayBackgroundColor: theme.colors.primary,
                    todayTextColor: theme.colors.primary,
                    arrowColor: theme.colors.primary,
                  }}
                />
              </View>
            </View>
          </Modal>
        )}
      </View>
    </Modal>
  );

  const _renderHeader = () => (
    <Header
      goBack={() => navigation.goBack()}
      onSave={() => setConfirmVisible(true)}
    />
  );

  const _renderBody = () => (
    <Body
      statsData={details}
      markAllPresent={() => _handleMarkAll("present")}
      markAllAbsent={() => _handleMarkAll("absent")}
      searchStudents={_handleSearch}
      openCopyModal={() => setCopyModalVisible(true)}
    />
  );

  const _renderContent = () => {
    if (attendanceLoading) {
      return <Loader />;
    }

    if (attendanceError) {
      return (
        <NoDataFound
          title={ATTENDANCE_CONFIG.NoDataFound}
          buttonTitle={ATTENDANCE_CONFIG.retry}
          onPress={() =>
            fetchAttendanceStudents(
              Number(resolvedCourseBatchId),
              Number(resolvedPeriodId),
              date,
            )
          }
        />
      );
    }

    if (!students || students.length === 0) {
      return (
        <NoDataFound
          title={ATTENDANCE_CONFIG.NoDataFound}
          buttonTitle={ATTENDANCE_CONFIG.retry}
          onPress={() =>
            fetchAttendanceStudents(
              Number(resolvedCourseBatchId),
              Number(resolvedPeriodId),
              date,
            )
          }
        />
      );
    }

    return (
      <ScrollView>
        <StudentList
          studentsData={students}
          onStatusChange={_handleSingleChange}
        />
      </ScrollView>
    );
  };

  return (
    <>
      {_renderHeader()}
      <PageContainer isLightStatusBar={true}>
        {_renderBody()}
        {_renderContent()}

        {_renderCopyModal()}

        <CustomModal
          visible={confirmVisible}
          setVisible={setConfirmVisible}
          onConfirm={_submitAttendance}
        />
      </PageContainer>
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
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#F9F9F9",
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
