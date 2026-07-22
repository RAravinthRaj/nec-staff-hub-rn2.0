/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { BottomSheet, Icon, useTheme } from "@rneui/themed";
import ElevatedView from "react-native-elevated-view";
import { styles as S } from "./styles";
import { DropDown } from "../DropDown";
import { DateInput } from "../DateInput";
import { OA_HOME_CONFIG } from "../../config";
import { Fonts, Images } from "@/assets";

interface DropdownItem {
  label: string;
  value: string;
}

interface PeriodItem {
  id: number;
  label: string;
}

interface SummaryData {
  totalStudents: number;
  present: number;
  absent: number;
  onDuty: number;
  mixed: number;
}

interface PaginationData {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

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

export interface IBody {
  department: string;
  year: string;
  mode: "DAY" | "RANGE" | "PERIOD";
  periodId?: number;
  startDate: Date;
  endDate: Date;
  search: string;
  statusFilter: string;
  departments: DropdownItem[];
  years: DropdownItem[];
  periods: PeriodItem[];
  summary: SummaryData;
  pagination: PaginationData;
  selectedPeriodLabel?: string;
  onDepartmentChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onModeChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onApplyFilters: () => void;
  onSave: () => void;
  onMarkAllPresent: () => void;
  onMarkAllAbsent: () => void;
  onMarkAllOd: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  saveLoading: boolean;
  studentsLoading: boolean;
  showStatistics?: boolean;
}

export const Body = ({
  department,
  year,
  mode,
  periodId,
  startDate,
  endDate,
  search,
  statusFilter,
  departments,
  years,
  periods,
  summary,
  pagination,
  onDepartmentChange,
  onYearChange,
  onModeChange,
  onPeriodChange,
  onStartDateChange,
  onEndDateChange,
  onSearchChange,
  onStatusFilterChange,
  onApplyFilters,
  onSave,
  onMarkAllPresent,
  onMarkAllAbsent,
  onMarkAllOd,
  onPreviousPage,
  onNextPage,
  saveLoading,
  studentsLoading,
  showStatistics = true,
}: IBody) => {
  const { theme } = useTheme();
  const colors: any = theme.colors;
  const [isVisible, setIsVisible] = useState(false);

  const renderTitle = (title: string) => (
    <View style={StyleSheet.flatten([S.headerText])}>
      <Text style={StyleSheet.flatten([S.titleText])}>{title}</Text>
      <Text
        style={StyleSheet.flatten([
          S.typeText,
          { color: colors.red, marginLeft: 5 },
        ])}
      >
        {OA_HOME_CONFIG.requiredMark}
      </Text>
    </View>
  );

  const statsData = {
    totalStudents: summary.totalStudents,
    present: summary.present,
    absent: summary.absent,
    onDuty: summary.onDuty,
  };

  const renderStatCard = ({ item }: { item: (typeof OA_STATISTICS_CARDS)[number] }) => (
    <View
      style={StyleSheet.flatten([
        S.card,
        { backgroundColor: colors[item.color] },
      ])}
    >
      <View style={StyleSheet.flatten([S.imageContainer])}>
        <Image
          source={Images[item.image]}
          style={StyleSheet.flatten([S.image])}
        />
      </View>
      <View style={StyleSheet.flatten([S.detailContainer])}>
        <Text
          style={StyleSheet.flatten([
            S.detail,
            { color: theme.colors.white, fontFamily: Fonts.bold },
          ])}
        >
          {statsData[item.image]}
        </Text>
        <Text
          style={StyleSheet.flatten([
            S.description,
            { color: theme.colors.white, fontFamily: Fonts.semibold },
          ])}
        >
          {item.description}
        </Text>
      </View>
    </View>
  );

  const renderStatistics = () => (
    <FlatList
      data={OA_STATISTICS_CARDS}
      keyExtractor={(_, index) => index.toString()}
      numColumns={2}
      renderItem={renderStatCard}
      columnWrapperStyle={{ gap: 5 }}
      contentContainerStyle={StyleSheet.flatten([S.statsHeaderContainer])}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );

  const renderBulkActionSheet = () => (
    <BottomSheet
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      modalProps={{
        animationType: "slide",
        transparent: true,
      }}
      containerStyle={S.backdrop}
    >
      <View
        style={StyleSheet.flatten([
          S.sheet,
          { backgroundColor: theme.colors.white },
        ])}
      >
        <View style={StyleSheet.flatten([S.bottomTextContainer])}>
          <Text style={StyleSheet.flatten([S.bottomText])}>
            {OA_HOME_CONFIG.modalTitle}
          </Text>
          <Text style={StyleSheet.flatten([S.bottomSubText])}>
            {OA_HOME_CONFIG.modalSubTitle}
          </Text>
        </View>

        <View style={StyleSheet.flatten([S.bottomButtonContainer])}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              onMarkAllAbsent();
              setIsVisible(false);
            }}
            style={StyleSheet.flatten([
              S.secondaryButton,
              { borderColor: colors.red },
            ])}
          >
            <Text style={StyleSheet.flatten([S.text, { color: colors.red }])}>
              {OA_HOME_CONFIG.markAllAbsent}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              onMarkAllPresent();
              setIsVisible(false);
            }}
            style={StyleSheet.flatten([
              S.primaryButton,
              { backgroundColor: colors.badgeGreen },
            ])}
          >
            <Text
              style={StyleSheet.flatten([
                S.text,
                { color: theme.colors.white },
              ])}
            >
              {OA_HOME_CONFIG.markAllPresent}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            onMarkAllOd();
            setIsVisible(false);
          }}
          style={StyleSheet.flatten([
            S.odButton,
            { backgroundColor: colors.orange },
          ])}
        >
          <Text
            style={StyleSheet.flatten([S.text, { color: theme.colors.white }])}
          >
            {OA_HOME_CONFIG.markAllOd}
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );

  const renderSearchBar = () => (
    <View style={StyleSheet.flatten([S.searchBarContainer])}>
      <ElevatedView
        elevation={3}
        style={StyleSheet.flatten([
          S.searchBarElevatedContainer,
          { borderRadius: 12 },
        ])}
      >
        <TextInput
          style={StyleSheet.flatten([
            S.input,
            {
              borderColor: colors.border,
              color: theme.colors.black,
            },
          ])}
          returnKeyType="search"
          placeholder={OA_HOME_CONFIG.searchPlaceholder}
          placeholderTextColor={colors.border}
          onChangeText={onSearchChange}
          value={search}
          autoFocus={false}
        />
      </ElevatedView>

      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        activeOpacity={0.2}
        hitSlop={15}
      >
        <Icon name="dots-three-vertical" type="entypo" size={25} />
      </TouchableOpacity>
      {renderBulkActionSheet()}
    </View>
  );

  const renderDropDownField = (
    title: string,
    value: string,
    items: DropdownItem[],
    onChange: (value: string) => void,
    placeholder = OA_HOME_CONFIG.selectPlaceholder,
  ) => (
    <View style={StyleSheet.flatten([S.field])}>
      {renderTitle(title)}
      <DropDown
        value={value}
        placeholder={placeholder}
        items={items}
        onChange={onChange}
      />
    </View>
  );

  const renderDateField = (
    title: string,
    value: Date,
    onChange: (date: Date) => void,
  ) => (
    <View style={StyleSheet.flatten([S.dateField])}>
      {renderTitle(title)}
      <DateInput value={value} onChange={onChange} />
    </View>
  );

  const renderModeAndDepartmentFields = () => (
    <View style={StyleSheet.flatten([S.categoryContainer])}>
      {renderDropDownField(
        OA_HOME_CONFIG.mode,
        mode,
        OA_HOME_CONFIG.modes,
        onModeChange,
      )}
      {renderDropDownField(
        OA_HOME_CONFIG.department,
        department,
        departments,
        onDepartmentChange,
      )}
    </View>
  );

  const renderYearAndStatusFields = () => (
    <View style={StyleSheet.flatten([S.categoryContainer])}>
      {renderDropDownField(OA_HOME_CONFIG.year, year, years, onYearChange)}
      {renderDropDownField(
        OA_HOME_CONFIG.statusFilter,
        statusFilter,
        OA_HOME_CONFIG.statusOptions.filter(
          (item) => mode === "RANGE" || item.value !== "mixed",
        ),
        onStatusFilterChange,
        OA_HOME_CONFIG.all,
      )}
    </View>
  );

  const renderPeriodField = () => {
    if (mode !== "PERIOD") {
      return null;
    }

    return (
      <View style={StyleSheet.flatten([S.fullWidthField])}>
        {renderTitle(OA_HOME_CONFIG.period)}
        <DropDown
          value={periodId ? String(periodId) : ""}
          placeholder={OA_HOME_CONFIG.selectPlaceholder}
          items={periods.map((item) => ({
            label: item.label,
            value: String(item.id),
          }))}
          onChange={onPeriodChange}
        />
      </View>
    );
  };

  const renderDateFields = () => (
    <View style={StyleSheet.flatten([S.dateContainer])}>
      {renderDateField(OA_HOME_CONFIG.startDate, startDate, onStartDateChange)}
      {mode === "RANGE"
        ? renderDateField(OA_HOME_CONFIG.endDate, endDate, onEndDateChange)
        : null}
    </View>
  );

  const renderActionButtons = () => (
    <View style={StyleSheet.flatten([S.actionRow])}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={StyleSheet.flatten([
          S.secondaryButton,
          { borderColor: colors.primary },
        ])}
        onPress={onApplyFilters}
      >
        <Text
          style={StyleSheet.flatten([S.text, { color: theme.colors.primary }])}
        >
          {studentsLoading ? OA_HOME_CONFIG.loading : OA_HOME_CONFIG.applyButtonTitle}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={StyleSheet.flatten([
          S.primaryButton,
          { backgroundColor: theme.colors.primary },
        ])}
        onPress={onSave}
      >
        <Text
          style={StyleSheet.flatten([S.text, { color: theme.colors.white }])}
        >
          {saveLoading ? OA_HOME_CONFIG.saving : OA_HOME_CONFIG.buttonTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderPagination = () => (
    <View style={StyleSheet.flatten([S.paginationRow])}>
      <Text
        style={StyleSheet.flatten([S.paginationText, { color: theme.colors.black }])}
      >
        {OA_HOME_CONFIG.page} {pagination.page} /{" "}
        {Math.max(pagination.totalPages, 1)}
      </Text>

      <View style={StyleSheet.flatten([S.paginationButtons])}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPreviousPage}
          style={StyleSheet.flatten([
            S.paginationButton,
            { borderColor: colors.border },
          ])}
        >
          <Text style={StyleSheet.flatten([S.paginationButtonText])}>
            {OA_HOME_CONFIG.previous}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onNextPage}
          style={StyleSheet.flatten([
            S.paginationButton,
            { borderColor: colors.border },
          ])}
        >
          <Text style={StyleSheet.flatten([S.paginationButtonText])}>
            {OA_HOME_CONFIG.next}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTableHeader = () => (
    <View
      style={StyleSheet.flatten([
        S.titleContainer,
        {
          backgroundColor: theme.colors.secondary,
          borderColor: theme.colors.primary,
        },
      ])}
    >
      <View style={StyleSheet.flatten([S.titleItem])}>
        <Text style={StyleSheet.flatten([S.titleHeaderText])}>
          {OA_HOME_CONFIG.roll} {OA_HOME_CONFIG.number}
        </Text>
      </View>
      <View style={StyleSheet.flatten([S.titleItem])}>
        <Text style={StyleSheet.flatten([S.titleHeaderText])}>
          {OA_HOME_CONFIG.name}
        </Text>
      </View>
      <View style={StyleSheet.flatten([S.titleItem])}>
        <Text style={StyleSheet.flatten([S.titleHeaderText])}>
          {OA_HOME_CONFIG.status}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={StyleSheet.flatten([S.container])}>
      <View style={StyleSheet.flatten([S.headerContainer])}>
        {renderModeAndDepartmentFields()}
        {renderYearAndStatusFields()}
        {renderPeriodField()}
        {renderDateFields()}
        {renderSearchBar()}
        {showStatistics ? renderStatistics() : null}
        {renderActionButtons()}
        {renderPagination()}
        {renderTableHeader()}
      </View>
    </View>
  );
};
