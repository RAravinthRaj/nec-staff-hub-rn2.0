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
  FlatList,
} from "react-native";
import ElevatedView from "react-native-elevated-view";
import { Icon, useTheme } from "@rneui/themed";
import { Loader, NoDataFound, PageContainer } from "@/components";
import { Header, DropDown, DateInput, StudentList } from "../OAHome/components";
import { OA_HOME_CONFIG } from "../OAHome/config";
import OAHomeService from "../OAHome/services";
import { showToast } from "@/utils";
import { Fonts, Images } from "@/assets";

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
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  filtersCard: {
    borderRadius: 18,
    padding: 16,
    gap: 14,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  field: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  titleText: {
    fontSize: 16,
    fontFamily: Fonts.semibold,
    lineHeight: 22,
  },
  searchInput: {
    borderWidth: 0.5,
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 15,
    borderRadius: 12,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
  },
  secondaryButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.semibold,
  },
  statsContainer: {
    width: "100%",
    paddingHorizontal: 5,
    marginTop: 18,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  image: {
    height: 28,
    width: 28,
  },
  statCard: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  detailContainer: {
    display: "flex",
    flexDirection: "column",
  },
  statValue: {
    fontSize: 25,
    letterSpacing: 0.4,
    fontFamily: Fonts.bold,
  },
  statLabel: {
    fontSize: 13,
    fontFamily: Fonts.semibold,
  },
  paginationRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 18,
  },
  paginationText: {
    fontSize: 14,
    fontFamily: Fonts.semibold,
  },
  paginationButtons: {
    flexDirection: "row",
    gap: 10,
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
    fontSize: 15,
    color: "white",
    fontFamily: Fonts.semibold,
    textAlign: "center",
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
  const [hasLoadedStudents, setHasLoadedStudents] = useState(false);
  const [initialStudentsLoadSettled, setInitialStudentsLoadSettled] = useState(false);
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
      setSummary({
        totalStudents: 0,
        present: 0,
        absent: 0,
        onDuty: 0,
        mixed: 0,
      });
      setPagination({
        page: 1,
        pageSize: 10,
        totalCount: 0,
        totalPages: 0,
      });
      setHasLoadedStudents(false);
      setInitialStudentsLoadSettled(false);

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
    if (!department || !year) {
      showToast(OA_HOME_CONFIG.selectDepartmentYearError, "error");
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
    if (metaLoading || !department || !year) return;
    fetchStudents(1);
  }, [metaLoading, department, year, mode]);

  const handleExport = async () => {
    try {
      setExportLoading(true);
      const res = await OAHomeService.exportAttendanceReportAPI({
        ...filterPayload,
        page: undefined,
        pageSize: undefined,
      });
      showToast(
        res?.payload?.message || OA_HOME_CONFIG.exportQueuedMessage,
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
      <Text style={[styles.titleText, { color: theme.colors.black }]}>{title}</Text>
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
          {statsData[item.image]}
        </Text>
        <Text style={[styles.statLabel, { color: theme.colors.white }]}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  const renderStats = () => (
    <FlatList
      data={OA_STATISTICS_CARDS}
      keyExtractor={(_, index) => index.toString()}
      numColumns={2}
      renderItem={renderStatCard}
      columnWrapperStyle={{ gap: 5 }}
      contentContainerStyle={styles.statsContainer}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );

  const renderPagination = () => (
    <View style={styles.paginationRow}>
      <Text style={[styles.paginationText, { color: theme.colors.black }]}>
        {OA_HOME_CONFIG.page} {pagination.page} / {Math.max(pagination.totalPages, 1)}
      </Text>

      <View style={styles.paginationButtons}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => pagination.page > 1 && fetchStudents(pagination.page - 1)}
          style={[styles.paginationButton, { borderColor: colors.border }]}
        >
          <Text style={styles.paginationButtonText}>{OA_HOME_CONFIG.previous}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            pagination.page < pagination.totalPages && fetchStudents(pagination.page + 1)
          }
          style={[styles.paginationButton, { borderColor: colors.border }]}
        >
          <Text style={styles.paginationButtonText}>{OA_HOME_CONFIG.next}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
        {renderDropdownField(OA_HOME_CONFIG.mode, mode, REPORT_MODES, (value) => {
          setMode(value as AttendanceMode);
          setPage(1);
        })}
        {renderDropdownField(
          OA_HOME_CONFIG.department,
          department,
          departments,
          (value) => {
            setDepartment(value);
            setPage(1);
          },
        )}
      </View>

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
            {studentsLoading ? OA_HOME_CONFIG.loading : OA_HOME_CONFIG.applyButtonTitle}
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
    if (students.length === 0) {
      return (
        <NoDataFound
          title={OA_HOME_CONFIG.filterNoDataTitle}
          buttonTitle={OA_HOME_CONFIG.applyButtonTitle}
          onPress={() => fetchStudents(1)}
        />
      );
    }

    return (
      <>
        {renderTableHeader()}
        <StudentList studentsData={students} mode={mode} editable={false} />
      </>
    );
  };

  const renderContent = () => {
    if (metaLoading) {
      return <Loader />;
    }

    if (!initialStudentsLoadSettled && department && year) {
      return <Loader />;
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          {renderFilterPanel()}
          {renderStats()}
          {renderPagination()}
        </View>
        {renderStudentSection()}
      </ScrollView>
    );
  };

  return (
    <>
      <Header navigateToNotification={navigateToNotification} />
      <PageContainer isLightStatusBar={true}>{renderContent()}</PageContainer>
    </>
  );
};
