/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { Text, StyleSheet, View, ScrollView } from "react-native";
import { styles as S } from "./styles";
import { useTheme } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { CustomSwitch } from "../Switch";

export interface IStudentList {
  studentsData: any[];
  onStatusChange?: (studentId: number, status: string) => void;
}

export const StudentList = ({ studentsData, onStatusChange }: IStudentList) => {
  const { theme } = useTheme();

  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    setStudents(studentsData || []);
  }, [studentsData]);

  const _handleStatusChange = (studentId: number, status: string) => {
    if (onStatusChange) {
      onStatusChange(studentId, status);
    }
  };

  const _renderData = () => {
    return (
      <View
        style={StyleSheet.flatten([
          S.mainTitleContainer,
          {
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.border,
          },
        ])}
      >
        {students.map((student: any, index: number) => {
          const isLast = index === students.length - 1;

          return (
            <View
              key={student.studentId}
              style={StyleSheet.flatten([
                S.titleContainer,
                isLast && S.lastStyle,
                {
                  backgroundColor:
                    index % 2 !== 0
                      ? theme.colors.white
                      : theme.colors.tertiaryBackground,
                  borderColor: theme.colors.border,
                  pointerEvents: student?.status === "od" ? "none" : "auto",
                },
              ])}
            >
              <View style={StyleSheet.flatten([S.titleItem])}>
                <Text
                  style={StyleSheet.flatten([
                    S.titleText,
                    {
                      color: theme.colors.black,
                      opacity: student?.status === "od" ? 0.4 : 1,
                    },
                  ])}
                >
                  {student.rollNumber}
                </Text>
              </View>

              <View style={StyleSheet.flatten([S.titleItem])}>
                <Text
                  style={StyleSheet.flatten([
                    S.titleText,
                    {
                      color: theme.colors.black,
                      opacity: student?.status === "od" ? 0.4 : 1,
                    },
                  ])}
                >
                  {student.name}
                </Text>
              </View>

              <View style={StyleSheet.flatten([S.titleItem])}>
                <CustomSwitch
                  status={student.status}
                  onChange={(status: string) =>
                    _handleStatusChange(student.studentId, status)
                  }
                />
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View
      style={StyleSheet.flatten([
        S.container,
        { backgroundColor: theme.colors.white },
      ])}
    >
      {_renderData()}
    </View>
  );
};
