/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { Loader, NoDataFound, PageContainer } from "@/components";
import { ScrollView } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Body, Header, StudentList } from "./components";
import { OA_HOME_CONFIG } from "./config";
import OAHomeService from "./services";
import { showToast } from "@/utils";
import { useNotificationStore } from "../Notification/stores";

type AttendanceMode = "DAY" | "RANGE" | "PERIOD";
type StudentStatus = "present" | "absent" | "onDuty" | "mixed";

interface DropdownItem {
  label: string;
  value: string;
}

interface PeriodItem {
  id: number;
  label: string;
  period_number: string;
  start_time: string;
  end_time: string;
}

interface StudentRow {
  studentId: number;
  rollNumber: number;
  name: string;
  status: StudentStatus;
  originalStatus: StudentStatus;
  presentDays: number;
  absentDays: number;
  odDays: number;
  totalDays: number;
}

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const INITIAL_SUMMARY = {
  totalStudents: 0,
  present: 0,
  absent: 0,
  onDuty: 0,
  mixed: 0,
};

const INITIAL_PAGINATION = {
  page: 1,
  pageSize: 10,
  totalCount: 0,
  totalPages: 0,
};

export const OAHomeScreen = ({ navigation }: any) => {
  const { unreadCount, fetchNotifications } = useNotificationStore();
  const [departments, setDepartments] = useState<DropdownItem[]>([]);
  const [years, setYears] = useState<DropdownItem[]>([]);
  const [periods, setPeriods] = useState<PeriodItem[]>([]);

  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [mode, setMode] = useState<AttendanceMode>("DAY");
  const [statusFilter, setStatusFilter] = useState("");
  const [periodId, setPeriodId] = useState<number | undefined>();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [students, setStudents] = useState<StudentRow[]>([]);
  const [metaLoading, setMetaLoading] = useState(true);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [hasLoadedStudents, setHasLoadedStudents] = useState(false);
  const [initialStudentsLoadSettled, setInitialStudentsLoadSettled] = useState(false);

  const [summary, setSummary] = useState(INITIAL_SUMMARY);
  const [pagination, setPagination] = useState(INITIAL_PAGINATION);

  const selectedPeriod = useMemo(
    () => periods.find((item) => item.id === periodId),
    [periodId, periods],
  );

  const filterPayload = useMemo(
    () => ({
      department,
      year,
      startDate: formatDate(startDate),
      endDate: mode === "RANGE" ? formatDate(endDate) : undefined,
      mode,
      periodId: mode === "PERIOD" ? periodId : undefined,
      status: statusFilter || undefined,
      search,
      page,
      pageSize: 10,
    }),
    [department, year, startDate, endDate, mode, periodId, statusFilter, search, page],
  );

  const loadMeta = useCallback(async () => {
    try {
      setMetaLoading(true);
      setStudents([]);
      setSummary(INITIAL_SUMMARY);
      setPagination(INITIAL_PAGINATION);
      setHasLoadedStudents(false);
      setInitialStudentsLoadSettled(false);

      const res = await OAHomeService.getMetaAPI();
      const payload = res?.payload;

      const nextDepartments = payload?.departments ?? [];
      const nextYears = payload?.years ?? [];
      const nextPeriods = payload?.periods ?? [];

      setDepartments(nextDepartments);
      setYears(nextYears);
      setPeriods(nextPeriods);

      if (nextDepartments[0]?.value) {
        setDepartment(nextDepartments[0].value);
      }

      if (nextYears[0]?.value) {
        setYear(nextYears[0].value);
      }

      if (nextPeriods[0]?.id) {
        setPeriodId(Number(nextPeriods[0].id));
      }
    } catch (err: any) {
      showToast(err?.message || OA_HOME_CONFIG.metaLoadError, "error");
    } finally {
      setMetaLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMeta();
    fetchNotifications("all");
  }, [fetchNotifications, loadMeta]);

  const fetchStudents = async (nextPage = page) => {
    if (!year) {
      showToast(OA_HOME_CONFIG.selectYearError || "Please select a year", "error");
      return;
    }

    if (mode === "PERIOD" && !periodId) {
      showToast(OA_HOME_CONFIG.selectPeriodError, "error");
      return;
    }

    try {
      setStudentsLoading(true);
      const res = await OAHomeService.getStudentsAPI({
        ...filterPayload,
        page: nextPage,
      });

      const payload = res?.payload;
      const nextStudents =
        payload?.students?.map((item: any) => ({
          studentId: Number(item.student_id),
          rollNumber: Number(item.rollNumber),
          name: item.name,
          status: item.status as StudentStatus,
          originalStatus: item.status as StudentStatus,
          presentDays: Number(item.present_days ?? 0),
          absentDays: Number(item.absent_days ?? 0),
          odDays: Number(item.od_days ?? 0),
          totalDays: Number(item.total_days ?? 0),
        })) ?? [];

      setStudents(nextStudents);
      setSummary({
        totalStudents: Number(payload?.summary?.total_students ?? 0),
        present: Number(payload?.summary?.present_count ?? 0),
        absent: Number(payload?.summary?.absent_count ?? 0),
        onDuty: Number(payload?.summary?.od_count ?? 0),
        mixed: Number(payload?.summary?.mixed_count ?? 0),
      });
      setPagination({
        page: Number(payload?.pagination?.page ?? nextPage),
        pageSize: Number(payload?.pagination?.page_size ?? 10),
        totalCount: Number(payload?.pagination?.total_count ?? 0),
        totalPages: Number(payload?.pagination?.total_pages ?? 0),
      });
      setPage(Number(payload?.pagination?.page ?? nextPage));
      setHasLoadedStudents(true);
    } catch (err: any) {
      showToast(err?.message || OA_HOME_CONFIG.fetchStudentsError, "error");
    } finally {
      setInitialStudentsLoadSettled(true);
      setStudentsLoading(false);
    }
  };

  useEffect(() => {
    if (metaLoading || !year) return;
    fetchStudents(1);
  }, [metaLoading, year, mode, periodId]);

  const _navigateToNotification = () => navigation.navigate("Notification");

  const handleDepartmentChange = (value: string) => {
    setDepartment(value);
    setPage(1);
  };

  const handleYearChange = (value: string) => {
    setYear(value);
    setPage(1);
  };

  const handleModeChange = (value: string) => {
    setMode(value as AttendanceMode);
    setPage(1);
  };

  const handlePeriodChange = (value: string) => {
    setPeriodId(Number(value));
    setPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleApplyFilters = async () => {
    setPage(1);
    await fetchStudents(1);
  };

  const handleStatusChange = (studentId: number, status: StudentStatus) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.studentId === studentId ? { ...student, status } : student,
      ),
    );
  };

  const handleBulkStatusChange = (status: StudentStatus) => {
    setStudents((prev) => prev.map((student) => ({ ...student, status })));
  };

  const mapStatusForApi = (
    status: StudentStatus,
  ): "PRESENT" | "ABSENT" | "ON_DUTY" | null => {
    if (status === "present") return "PRESENT";
    if (status === "absent") return "ABSENT";
    if (status === "onDuty") return "ON_DUTY";
    return null;
  };

  const handleSaveAttendance = async () => {
    if (saveLoading) return;

    const payloadStudents = students
      .map((student) => ({
        student_id: student.studentId,
        status: mapStatusForApi(student.status),
      }))
      .filter((student) => Boolean(student.status)) as {
      student_id: number;
      status: "PRESENT" | "ABSENT" | "ON_DUTY";
    }[];

    if (!payloadStudents.length) {
      showToast(OA_HOME_CONFIG.noConcreteStatusInfo, "info");
      return;
    }

    try {
      setSaveLoading(true);
      const res = await OAHomeService.saveAttendanceAPI(filterPayload, payloadStudents);
      const affectedStudents = Number(res?.payload?.affected_students ?? payloadStudents.length);
      const affectedDates = Number(res?.payload?.affected_dates ?? 1);
      showToast(
        OA_HOME_CONFIG.saveAttendanceSuccess
          .replace("{students}", String(affectedStudents))
          .replace("{dates}", String(affectedDates)),
        "success",
      );
      await fetchStudents(page);
    } catch (err: any) {
      showToast(err?.message || OA_HOME_CONFIG.saveAttendanceError, "error");
    } finally {
      setSaveLoading(false);
    }
  };

  const handlePreviousPage = async () => {
    if (pagination.page <= 1) return;
    await fetchStudents(pagination.page - 1);
  };

  const handleNextPage = async () => {
    if (pagination.page >= pagination.totalPages) return;
    await fetchStudents(pagination.page + 1);
  };

  const renderStudentSection = () => {
    if (students.length === 0) {
      return (
        <NoDataFound
          title={OA_HOME_CONFIG.noDataTitle}
          buttonTitle={OA_HOME_CONFIG.applyButtonTitle}
          onPress={handleApplyFilters}
        />
      );
    }

    return (
      <StudentList
        studentsData={students}
        mode={mode}
        onStatusChange={handleStatusChange}
      />
    );
  };

  const renderContent = () => {
    if (metaLoading) {
      return <Loader />;
    }

    if (!initialStudentsLoadSettled && year) {
      return <Loader />;
    }

    return (
      <ScrollView>
        <Body
          department={department}
          year={year}
          mode={mode}
          periodId={periodId}
          startDate={startDate}
          endDate={endDate}
          search={search}
          statusFilter={statusFilter}
          departments={departments}
          years={years}
          periods={periods}
          summary={summary}
          pagination={pagination}
          selectedPeriodLabel={selectedPeriod?.label}
          onDepartmentChange={handleDepartmentChange}
          onYearChange={handleYearChange}
          onModeChange={handleModeChange}
          onPeriodChange={handlePeriodChange}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onSearchChange={setSearch}
          onStatusFilterChange={handleStatusFilterChange}
          onApplyFilters={handleApplyFilters}
          onSave={handleSaveAttendance}
          onMarkAllPresent={() => handleBulkStatusChange("present")}
          onMarkAllAbsent={() => handleBulkStatusChange("absent")}
          onMarkAllOd={() => handleBulkStatusChange("onDuty")}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          saveLoading={saveLoading}
          studentsLoading={studentsLoading}
          showStatistics={false}
        />
        {renderStudentSection()}
      </ScrollView>
    );
  };

  return (
    <>
      <Header
        navigateToNotification={_navigateToNotification}
        showBadge={unreadCount > 0}
      />
      <PageContainer isLightStatusBar={true}>{renderContent()}</PageContainer>
    </>
  );
};
