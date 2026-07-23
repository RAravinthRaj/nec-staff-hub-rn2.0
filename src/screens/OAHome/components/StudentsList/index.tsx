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

  const renderStatusPill = (status: StudentStatus) => {
    let pillColor = colors.badgeGreen || "#008000";
    let label = "present";
    let isDotRight = true;

    if (status === "absent") {
      pillColor = colors.red || "#EA0000";
      label = "absent";
      isDotRight = false;
    } else if (status === "onDuty" || (status as string) === "od") {
      pillColor = colors.orange || "#FF6F00";
      label = "on-duty";
      isDotRight = false;
    } else if (status === "mixed") {
      pillColor = colors.orange || "#FF6F00";
      label = "mixed";
      isDotRight = false;
    }

    return (
      <View
        style={{
          borderWidth: 1.5,
          borderColor: pillColor,
          borderRadius: 20,
          paddingHorizontal: 12,
          paddingVertical: 4,
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          backgroundColor: "#ffffff",
        }}
      >
        {!isDotRight && (
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: pillColor,
            }}
          />
        )}
        <Text
          style={{
            color: pillColor,
            fontSize: 13,
            fontWeight: "600",
            textTransform: "lowercase",
          }}
        >
          {label}
        </Text>
        {isDotRight && (
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: pillColor,
            }}
          />
        )}
      </View>
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
        renderStatusPill(student.status)
      )}
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
