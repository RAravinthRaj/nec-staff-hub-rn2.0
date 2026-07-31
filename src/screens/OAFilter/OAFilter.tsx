/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import ElevatedView from "react-native-elevated-view";
import { Icon, useTheme } from "@rneui/themed";
import { Loader, NoDataFound, PageContainer } from "@/components";
import { Header, DropDown, DateInput, StudentList } from "../OAHome/components";
import { OA_HOME_CONFIG } from "../OAHome/config";
import OAHomeService from "../OAHome/services";
import { showToast } from "@/utils";
import { useNotificationStore } from "../Notification/stores";
import { Fonts, Images } from "@/assets";
import { useAuthStore } from "@/store/useAuthStore";

type AttendanceMode = "DAY" | "RANGE";
type StudentStatus = "present" | "absent" | "onDuty" | "mixed";

interface DropdownItem {
  label: string;
  value: string;
}

interface StudentRow {
  studentId: number;
  rollNumber: number;
  name: string;
  status: StudentStatus;
  presentDays: number;
  absentDays: number;
  odDays: number;
  totalDays: number;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  filtersCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  field: {
    flex: 1,
    marginBottom: 14,
  },
  titleRow: {
    marginBottom: 6,
  },
  titleText: {
    fontSize: 13,
    fontFamily: Fonts.semibold,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    fontFamily: Fonts.semibold,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    width: "48%",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: 38,
    height: 38,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  detailContainer: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontFamily: Fonts.bold,
  },
  statLabel: {
    fontSize: 13,
    fontFamily: Fonts.semibold,
  },
  paginationContainer: {
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  paginationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paginationButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
  },
  paginationButtonText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
  pageChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 3,
    minWidth: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1.5,
    marginTop: 18,
    marginHorizontal: 16,
  },
  tableHeaderItem: {
    flex: 1,
    alignItems: "center",
  },
  tableHeaderText: {
    color: "#FFFFFF",
    fontFamily: Fonts.semibold,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "80%",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    elevation: 8,
  },
});

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const REPORT_MODES = OA_HOME_CONFIG.modes.filter(
  (item) => item.value === "DAY" || item.value === "RANGE",
);

const OA_STATISTICS_CARDS = [
  {
    image: "totalStudents",
    color: "secondary",
    description: OA_HOME_CONFIG.students,
  },
  {
    image: "present",
    color: "badgeGreen",
    description: OA_HOME_CONFIG.statusOptions[1].label,
  },
  {
    image: "absent",
    color: "red",
    description: OA_HOME_CONFIG.statusOptions[2].label,
  },
  {
    image: "onDuty",
    color: "orange",
    description: OA_HOME_CONFIG.statusOptions[3].label,
  },
] as const;

export const OAFilterScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const colors: any = theme.colors;

  const [departments, setDepartments] = useState<DropdownItem[]>([]);
  const [years, setYears] = useState<DropdownItem[]>([]);
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [mode, setMode] = useState<AttendanceMode>("DAY");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [metaLoading, setMetaLoading] = useState(true);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [summary, setSummary] = useState({
    totalStudents: 0,
    present: 0,
    absent: 0,
    onDuty: 0,
    mixed: 0,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  });

  const filterPayload = useMemo(
    () => ({
      department,
      year,
      startDate: formatDate(startDate),
      endDate: mode === "RANGE" ? formatDate(endDate) : undefined,
      mode,
      status: statusFilter || undefined,
      search,
      page,
      pageSize: 10,
    }),
    [department, year, startDate, endDate, mode, statusFilter, search, page],
  );

  const loadMeta = useCallback(async () => {
    try {
      setMetaLoading(true);
      setStudents([]);

      const res = await OAHomeService.getMetaAPI();
      const payload = res?.payload;
      const nextDepartments = payload?.departments ?? [];
      const nextYears = payload?.years ?? [];

      setDepartments(nextDepartments);
      setYears(nextYears);

      if (nextDepartments[0]?.value) {
        setDepartment(nextDepartments[0].value);
      }

      if (nextYears[0]?.value) {
        setYear(nextYears[0].value);
      }
    } catch (err: any) {
      showToast(err?.message || OA_HOME_CONFIG.metaLoadError, "error");
    } finally {
      setMetaLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMeta();
  }, [loadMeta]);

  const navigateToNotification = () => navigation.navigate("Notification");

  const fetchStudents = async (nextPage = page) => {
    if (!year) {
      showToast(
        OA_HOME_CONFIG.selectYearError || "Please select a year",
        "error",
      );
      return;
    }

    try {
      setStudentsLoading(true);
      const res = await OAHomeService.getReportStudentsAPI({
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
        totalPages: Number(
          payload?.pagination?.total_pages ??
            Math.ceil((payload?.pagination?.total_count ?? 0) / 10),
        ),
      });
      setPage(Number(payload?.pagination?.page ?? nextPage));
    } catch (err: any) {
      showToast(err?.message || OA_HOME_CONFIG.fetchStudentsError, "error");
    } finally {
      setStudentsLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      setExportLoading(true);
      const res = await OAHomeService.exportAttendanceReportAPI({
        ...filterPayload,
        page: undefined,
        pageSize: undefined,
      });
      showToast(
        (res?.payload as any)?.message || OA_HOME_CONFIG.exportQueuedMessage,
        "success",
      );
    } catch (err: any) {
      showToast(err?.message || OA_HOME_CONFIG.saveAttendanceError, "error");
    } finally {
      setExportLoading(false);
    }
  };

  const renderFieldTitle = (title: string) => (
    <View style={styles.titleRow}>
      <Text style={[styles.titleText, { color: theme.colors.black }]}>
        {title}
      </Text>
    </View>
  );

  const renderDropdownField = (
    title: string,
    value: string,
    items: DropdownItem[],
    onChange: (value: string) => void,
    placeholder = OA_HOME_CONFIG.selectPlaceholder,
  ) => (
    <View style={styles.field}>
      {renderFieldTitle(title)}
      <DropDown
        value={value}
        items={items}
        onChange={onChange}
        placeholder={placeholder}
      />
    </View>
  );

  const renderDateField = (
    title: string,
    value: Date,
    onChange: (date: Date) => void,
  ) => (
    <View style={styles.field}>
      {renderFieldTitle(title)}
      <DateInput value={value} onChange={onChange} />
    </View>
  );

  const statsData = {
    totalStudents: summary.totalStudents,
    present: summary.present,
    absent: summary.absent,
    onDuty: summary.onDuty,
  };

  const renderStatCard = ({
    item,
  }: {
    item: (typeof OA_STATISTICS_CARDS)[number];
  }) => (
    <View style={[styles.statCard, { backgroundColor: colors[item.color] }]}>
      <View style={styles.imageContainer}>
        <Image source={Images[item.image]} style={styles.image} />
      </View>
      <View style={styles.detailContainer}>
        <Text style={[styles.statValue, { color: theme.colors.white }]}>
          {statsData[item.image as keyof typeof statsData] ?? 0}
        </Text>
        <Text style={[styles.statLabel, { color: theme.colors.white }]}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsRow}>
      {OA_STATISTICS_CARDS.map((item) => (
        <React.Fragment key={item.image}>
          {renderStatCard({ item })}
        </React.Fragment>
      ))}
    </View>
  );

  const renderPagination = () => {
    const totalPages = Math.max(
      pagination.totalPages || Math.ceil(pagination.totalCount / 10),
      1,
    );
    const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <View style={styles.paginationContainer}>
        <View style={styles.paginationRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={pagination.page <= 1}
            onPress={() =>
              pagination.page > 1 && fetchStudents(pagination.page - 1)
            }
            style={[
              styles.paginationButton,
              {
                borderColor: colors.border,
                opacity: pagination.page <= 1 ? 0.4 : 1,
              },
            ]}
          >
            <Text style={styles.paginationButtonText}>
              {OA_HOME_CONFIG.previous}
            </Text>
          </TouchableOpacity>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: 6, flexGrow: 0 }}
          >
            {pagesArray.map((pageNum) => (
              <TouchableOpacity
                key={pageNum}
                activeOpacity={0.8}
                onPress={() => fetchStudents(pageNum)}
                style={[
                  styles.pageChip,
                  {
                    backgroundColor:
                      pagination.page === pageNum
                        ? theme.colors.primary
                        : theme.colors.tertiaryBackground,
                    borderColor:
                      pagination.page === pageNum
                        ? theme.colors.primary
                        : theme.colors.border,
                  },
                ]}
              >
                <Text
                  style={{
                    color:
                      pagination.page === pageNum ? "#FFF" : theme.colors.black,
                    fontFamily: Fonts.semibold,
                    fontSize: 13,
                  }}
                >
                  {pageNum}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            activeOpacity={0.8}
            disabled={pagination.page >= totalPages}
            onPress={() =>
              pagination.page < totalPages && fetchStudents(pagination.page + 1)
            }
            style={[
              styles.paginationButton,
              {
                borderColor: colors.border,
                opacity: pagination.page >= totalPages ? 0.4 : 1,
              },
            ]}
          >
            <Text style={styles.paginationButtonText}>
              {OA_HOME_CONFIG.next}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderTableHeader = () => (
    <View
      style={[
        styles.tableHeader,
        {
          backgroundColor: theme.colors.secondary,
          borderColor: theme.colors.primary,
        },
      ]}
    >
      <View style={styles.tableHeaderItem}>
        <Text style={styles.tableHeaderText}>
          {OA_HOME_CONFIG.roll} {OA_HOME_CONFIG.number}
        </Text>
      </View>
      <View style={styles.tableHeaderItem}>
        <Text style={styles.tableHeaderText}>{OA_HOME_CONFIG.name}</Text>
      </View>
      <View style={styles.tableHeaderItem}>
        <Text style={styles.tableHeaderText}>{OA_HOME_CONFIG.status}</Text>
      </View>
    </View>
  );

  const renderFilterPanel = () => (
    <ElevatedView
      elevation={4}
      style={[styles.filtersCard, { backgroundColor: theme.colors.white }]}
    >
      <View style={styles.row}>
        {renderDropdownField(
          OA_HOME_CONFIG.mode,
          mode,
          REPORT_MODES,
          (value) => {
            setMode(value as AttendanceMode);
            setPage(1);
          },
        )}
      </View>

      {useAuthStore.getState().user?.role === "STAFF" ? (
        <View style={styles.field}>
          {renderDropdownField(
            OA_HOME_CONFIG.statusFilter,
            statusFilter,
            OA_HOME_CONFIG.statusOptions,
            (value) => {
              setStatusFilter(value);
              setPage(1);
            },
            OA_HOME_CONFIG.all,
          )}
        </View>
      ) : (
        <View style={styles.row}>
          {renderDropdownField(OA_HOME_CONFIG.year, year, years, (value) => {
            setYear(value);
            setPage(1);
          })}
          {renderDropdownField(
            OA_HOME_CONFIG.statusFilter,
            statusFilter,
            OA_HOME_CONFIG.statusOptions,
            (value) => {
              setStatusFilter(value);
              setPage(1);
            },
            OA_HOME_CONFIG.all,
          )}
        </View>
      )}

      <View style={styles.row}>
        {renderDateField(OA_HOME_CONFIG.startDate, startDate, setStartDate)}
        {mode === "RANGE"
          ? renderDateField(OA_HOME_CONFIG.endDate, endDate, setEndDate)
          : null}
      </View>

      <View style={styles.field}>
        {renderFieldTitle(OA_HOME_CONFIG.name)}
        <TextInput
          style={[
            styles.searchInput,
            {
              borderColor: colors.border,
              color: theme.colors.black,
            },
          ]}
          value={search}
          onChangeText={setSearch}
          placeholder={OA_HOME_CONFIG.searchPlaceholder}
          placeholderTextColor={colors.border}
        />
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.secondaryButton, { borderColor: colors.primary }]}
          onPress={() => {
            setPage(1);
            fetchStudents(1);
          }}
        >
          <Text style={[styles.buttonText, { color: colors.primary }]}>
            {OA_HOME_CONFIG.applyButtonTitle}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.primaryButton, { backgroundColor: colors.primary }]}
          onPress={handleExport}
        >
          <Text style={[styles.buttonText, { color: theme.colors.white }]}>
            {exportLoading ? OA_HOME_CONFIG.loading : OA_HOME_CONFIG.export}
          </Text>
        </TouchableOpacity>
      </View>
    </ElevatedView>
  );

  const renderStudentSection = () => {
    const isHOD = useAuthStore.getState().user?.role !== "STAFF";

    if (students.length === 0) {
      return (
        <NoDataFound
          title={
            isHOD && !hasLoadedStudents
              ? "Please select and apply filters to view student details"
              : OA_HOME_CONFIG.filterNoDataTitle
          }
          buttonTitle={OA_HOME_CONFIG.applyButtonTitle}
          onPress={() => fetchStudents(1)}
        />
      );
    }

    return (
      <>
        {renderTableHeader()}
        <StudentList studentsData={students} mode={mode} editable={false} />
        {renderPagination()}
      </>
    );
  };

  const renderContent = () => {
    if (metaLoading) {
      return <Loader />;
    }

    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
      >
        <View style={styles.container}>
          {renderFilterPanel()}
          {renderStats()}
        </View>
        {renderStudentSection()}
      </ScrollView>
    );
  };

  const unreadCount = useNotificationStore((state) => state.unreadCount);

  return (
    <>
      <Header
        navigateToNotification={navigateToNotification}
        showBadge={unreadCount > 0}
      />
      <PageContainer isLightStatusBar={true}>{renderContent()}</PageContainer>

      {/* Apply Filters Modal Loader */}
      {studentsLoading && <Loader useModalLoader={true} />}
    </>
  );
};
