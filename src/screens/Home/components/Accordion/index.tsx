/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";
import { useTheme } from "@rneui/themed";
import ElevatedView from "react-native-elevated-view";
import Entypo from "@expo/vector-icons/Entypo";
import { Fonts } from "@/assets";
import { HOME_CONFIG } from "../../config";
import { styles as S } from "./styles";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

export interface IAccordian {
  data: any;
  date: string;
  navigateToAttendance: (courseBatchId: number, periodId: number) => void;
}

dayjs.extend(isBetween);
export const Accordion = ({ data, date, navigateToAttendance }: IAccordian) => {
  const [expanded, setExpanded] = useState(false);
  const { theme } = useTheme();

  const startTime = data?.startTime;
  const endTime = data?.endTime;

  const toggleAccordion = () => {
    setExpanded((prev) => !prev);
  };

  const convertTime = (time24?: string): string => {
    if (!time24) return "";

    const [hourStr, minute] = time24.split(":");
    let hour = parseInt(hourStr, 10);

    const period = hour >= 12 ? "P.M" : "A.M";

    hour = hour % 12;
    if (hour === 0) hour = 12;

    return `${hour.toString().padStart(2, "0")}:${minute} ${period}`;
  };

  const getBatchStatus = () => {
    if (!startTime || !endTime || !date) return "Upcoming";

    const now = dayjs();
    const selected = dayjs(date);

    if (selected.isBefore(now, "day")) return "Completed";
    if (selected.isAfter(now, "day")) return "Upcoming";

    const start = dayjs(`${date} ${startTime}`);
    const end = dayjs(`${date} ${endTime}`);

    if (now.isAfter(end)) return "Completed";
    if (now.isBetween(start, end, null, "[]")) return "Ongoing";

    return "Upcoming";
  };

  const _renderBadge = () => {
    const status = getBatchStatus();

    const background =
      status === "Completed"
        ? theme.colors.red
        : status === "Ongoing"
          ? theme.colors.white
          : theme.colors.primary;

    const borderColor =
      status === "Completed"
        ? theme.colors.red
        : status === "Ongoing"
          ? theme.colors.badgeGreen
          : theme.colors.white;

    const textColor =
      status === "Ongoing" ? theme.colors.badgeGreen : theme.colors.white;

    return (
      <View
        style={StyleSheet.flatten([
          S.badgeContainer,
          { backgroundColor: background, borderColor },
        ])}
      >
        <Text style={StyleSheet.flatten([S.badge, { color: textColor }])}>
          {status}
        </Text>
      </View>
    );
  };

  const _renderHeader = () => (
    <View style={StyleSheet.flatten([S.cardContainer])}>
      <View
        style={StyleSheet.flatten([
          S.logoContainer,
          {
            backgroundColor: expanded
              ? theme.colors.white
              : theme.colors.secondary,
          },
        ])}
      >
        <Text
          style={StyleSheet.flatten([
            S.logo,
            {
              color: expanded ? theme.colors.secondary : theme.colors.white,
            },
          ])}
        >
          {data?.courseName?.charAt(0) ?? ""}
        </Text>
      </View>

      <View style={StyleSheet.flatten([S.textContainer])}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[
            S.subName,
            { color: expanded ? theme.colors.white : theme.colors.black },
          ]}
        >
          {data?.courseCode ?? ""} - {data?.courseName ?? ""}
        </Text>

        <View style={StyleSheet.flatten([S.timeContainer])}>
          <Text
            style={StyleSheet.flatten([
              S.time,
              { color: expanded ? theme.colors.white : theme.colors.primary },
            ])}
          >
            {convertTime(data?.startTime)} - {convertTime(data?.endTime)}
          </Text>

          {_renderBadge()}
        </View>
      </View>

      <View style={StyleSheet.flatten([S.arrowContainer])}>
        <Entypo
          name={expanded ? "chevron-up" : "chevron-down"}
          size={24}
          color={expanded ? "white" : "black"}
        />
      </View>
    </View>
  );

  const _renderSubContent = (key: string, value: any) => (
    <View style={StyleSheet.flatten([S.yearContainer])}>
      <View style={StyleSheet.flatten([S.yearSubContainer])}>
        <Text style={StyleSheet.flatten([S.styledKey])}>{key}</Text>
      </View>
      <View style={StyleSheet.flatten([S.yearSubContainer])}>
        <Text style={StyleSheet.flatten([S.styledValue])}>{value}</Text>
      </View>
    </View>
  );

  const _renderButton = (courseBatchId: number, periodId: number) => (
    <ElevatedView style={StyleSheet.flatten([S.buttonContainer])} elevation={5}>
      <TouchableOpacity
        style={StyleSheet.flatten([
          S.button,
          { backgroundColor: theme.colors.primary },
        ])}
        activeOpacity={0.8}
        onPress={() => {
          navigateToAttendance(Number(courseBatchId), Number(periodId));
        }}
      >
        <Text
          style={StyleSheet.flatten([
            S.buttonTitle,
            { color: theme.colors.white, fontFamily: Fonts.semibold },
          ])}
        >
          {HOME_CONFIG.attendanceButton}
        </Text>
      </TouchableOpacity>
    </ElevatedView>
  );

  const _renderBody = () => (
    <View style={StyleSheet.flatten([S.bodyContainer])}>
      <Text style={StyleSheet.flatten([S.bodyTitle])}>{data?.subName}</Text>

      <View style={StyleSheet.flatten([S.yearMainContainer])}>
        {_renderSubContent(HOME_CONFIG.batch, data?.batch)}
        {_renderSubContent(HOME_CONFIG.year, data?.year)}
      </View>

      {_renderSubContent(HOME_CONFIG.faculty, data?.faculty)}
      {_renderSubContent(HOME_CONFIG.semester, data?.semester)}
      {_renderButton(data?.courseBatchId, data?.periodId)}
    </View>
  );

  return (
    <ElevatedView
      style={StyleSheet.flatten([
        S.accordionContainer,
        {
          backgroundColor: expanded
            ? theme.colors.secondary
            : theme.colors.white,
          borderColor: theme.colors.border,
        },
      ])}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleAccordion}
        style={StyleSheet.flatten([S.header])}
      >
        {_renderHeader()}
      </TouchableOpacity>

      <Collapsible collapsed={!expanded} duration={280}>
        <View
          style={StyleSheet.flatten([
            S.contentContainer,
            {
              borderWidth: expanded ? 1 : 0,
              borderColor: theme.colors.secondary,
              backgroundColor: theme.colors.white,
            },
          ])}
        >
          {_renderBody()}
        </View>
      </Collapsible>
    </ElevatedView>
  );
};

export default Accordion;
