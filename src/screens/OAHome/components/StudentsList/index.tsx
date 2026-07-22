/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { Text, StyleSheet, View } from "react-native";
import { styles as S } from "./styles";
import { useTheme } from "@rneui/themed";
import React from "react";
import { RadioButton } from "react-native-paper";
import { OA_HOME_CONFIG } from "../../config";

type StudentStatus = "present" | "absent" | "onDuty" | "mixed";

export interface IStudentList {
  studentsData: {
    studentId: number;
    rollNumber: number;
    name: string;
    status: StudentStatus;
    presentDays: number;
    absentDays: number;
    odDays: number;
    totalDays: number;
  }[];
  mode: "DAY" | "RANGE" | "PERIOD";
  editable?: boolean;
  onStatusChange?: (studentId: number, status: StudentStatus) => void;
}

const STATUS_MAP: Record<string, StudentStatus> = {
  P: "present",
  A: "absent",
  OD: "onDuty",
};

const getRangeSummary = (
  presentDays: number,
  absentDays: number,
  odDays: number,
) =>
  OA_HOME_CONFIG.rangeSummaryTemplate
    .replace("{present}", String(presentDays))
    .replace("{absent}", String(absentDays))
    .replace("{od}", String(odDays));

export const StudentList = ({
  studentsData,
  mode,
  editable = true,
  onStatusChange,
}: IStudentList) => {
  const { theme } = useTheme();
  const colors: any = theme.colors;

  const renderRadioButton = (
    studentId: number,
    selectedType: "P" | "A" | "OD",
    color: string,
    currentStatus: StudentStatus,
  ) => {
    const isSelected = STATUS_MAP[selectedType] === currentStatus;

    return (
      <View style={StyleSheet.flatten([S.radioButton])}>
        <RadioButton
          value={selectedType}
          status={isSelected ? "checked" : "unchecked"}
          onPress={() => onStatusChange?.(studentId, STATUS_MAP[selectedType])}
          color={color}
        />
      </View>
    );
  };

  const renderSummary = (student: IStudentList["studentsData"][number]) => {
    if (mode !== "RANGE") {
      return null;
    }

    return (
      <Text
        style={StyleSheet.flatten([
          S.summaryText,
          { color: theme.colors.black },
        ])}
      >
        {getRangeSummary(student.presentDays, student.absentDays, student.odDays)}
      </Text>
    );
  };

  const renderMixedLabel = (status: StudentStatus) => {
    if (status !== "mixed") {
      return null;
    }

    return (
      <Text
        style={StyleSheet.flatten([S.summaryText, { color: colors.orange }])}
      >
        {OA_HOME_CONFIG.mixed}
      </Text>
    );
  };

  const renderStudentStatus = (student: IStudentList["studentsData"][number]) => (
    <View style={StyleSheet.flatten([S.titleItem, S.statusColumn])}>
      {editable ? (
        <View style={StyleSheet.flatten([S.statusRow])}>
          {renderRadioButton(
            student.studentId,
            "P",
            colors.badgeGreen,
            student.status,
          )}
          {renderRadioButton(student.studentId, "A", colors.red, student.status)}
          {renderRadioButton(
            student.studentId,
            "OD",
            colors.orange,
            student.status,
          )}
        </View>
      ) : (
        <View
          style={StyleSheet.flatten([
            S.statusBadge,
            {
              backgroundColor:
                student.status === "present"
                  ? colors.badgeGreenBackground
                  : student.status === "absent"
                    ? colors.redBackground
                    : colors.orangeBackground,
            },
          ])}
        >
          <Text
            style={StyleSheet.flatten([
              S.statusBadgeText,
              {
                color:
                  student.status === "present"
                    ? colors.badgeGreen
                    : student.status === "absent"
                      ? colors.red
                      : colors.orange,
              },
            ])}
          >
            {student.status === "present"
              ? OA_HOME_CONFIG.statusOptions[1].label
              : student.status === "absent"
                ? OA_HOME_CONFIG.statusOptions[2].label
                : student.status === "onDuty"
                  ? OA_HOME_CONFIG.statusOptions[3].label
                  : OA_HOME_CONFIG.mixed}
          </Text>
        </View>
      )}
      {renderMixedLabel(student.status)}
    </View>
  );

  const renderStudentIdentity = (student: IStudentList["studentsData"][number]) => (
    <View style={StyleSheet.flatten([S.titleItem])}>
      <Text
        style={StyleSheet.flatten([S.titleText, { color: theme.colors.black }])}
      >
        {student.name}
      </Text>
      {renderSummary(student)}
    </View>
  );

  const renderStudentRoll = (rollNumber: number) => (
    <View style={StyleSheet.flatten([S.titleItem])}>
      <Text
        style={StyleSheet.flatten([S.titleText, { color: theme.colors.black }])}
      >
        {rollNumber}
      </Text>
    </View>
  );

  const renderStudentRow = (
    student: IStudentList["studentsData"][number],
    index: number,
  ) => {
    const isLast = index === studentsData.length - 1;

    return (
      <View
        key={student.studentId}
        style={StyleSheet.flatten([
          S.titleContainer,
          isLast && S.lastStyle,
          {
            backgroundColor:
              index % 2 !== 0 ? theme.colors.white : colors.tertiaryBackground,
            borderColor: colors.border,
          },
        ])}
      >
        {renderStudentRoll(student.rollNumber)}
        {renderStudentIdentity(student)}
        {renderStudentStatus(student)}
      </View>
    );
  };

  const renderStudentRows = () => studentsData.map(renderStudentRow);

  return (
    <View
      style={StyleSheet.flatten([
        S.container,
        { backgroundColor: theme.colors.white },
      ])}
    >
      <View
        style={StyleSheet.flatten([
        S.mainTitleContainer,
        {
          backgroundColor: theme.colors.white,
          borderColor: colors.border,
        },
      ])}
      >
        {renderStudentRows()}
      </View>
    </View>
  );
};
