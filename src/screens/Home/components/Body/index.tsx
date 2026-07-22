/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  BackHandler,
  StyleSheet,
} from "react-native";
import { Calendar } from "react-native-calendars";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useTheme } from "@rneui/themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { styles as S } from "./styles";
import { Fonts } from "@/assets";
import { HOME_CONFIG } from "../../config";

dayjs.extend(isoWeek);

export interface IBody {
  setDate: React.Dispatch<React.SetStateAction<string>>;
}

export const Body: React.FC<IBody> = ({ setDate }) => {
  const { theme } = useTheme();
  const today = dayjs().format("YYYY-MM-DD");

  const [selectedDate, setSelectedDate] = useState(today);
  const [weekDates, setWeekDates] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const getWeekDates = useCallback((date: string) => {
    const start = dayjs(date).isoWeekday(1);
    return Array.from({ length: 6 }).map((_, i) =>
      start.add(i, "day").format("YYYY-MM-DD"),
    );
  }, []);

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate, setDate]);

  useEffect(() => {
    setWeekDates(getWeekDates(today));
  }, [getWeekDates, today]);

  useEffect(() => {
    const backAction = () => {
      if (showCalendar) {
        setShowCalendar(false);
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => subscription.remove();
  }, [showCalendar]);

  const _renderHeader = () => (
    <View
      style={StyleSheet.flatten([
        S.headerContainer,
        { backgroundColor: theme.colors.white },
      ])}
    >
      <View style={StyleSheet.flatten([S.textContainer])}>
        <Text style={StyleSheet.flatten([S.day, { fontFamily: Fonts.bold }])}>
          {dayjs(selectedDate).format("dddd")}
        </Text>

        <Text
          style={StyleSheet.flatten([
            S.date,
            { color: theme.colors.grey2, fontFamily: Fonts.regular },
          ])}
        >
          {dayjs(selectedDate).format("MMMM D, YYYY")}
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setShowCalendar(true)}
      >
        <FontAwesome
          name="calendar"
          size={25}
          color={theme.colors.primary}
          style={StyleSheet.flatten([{ marginRight: 15 }])}
        />
      </TouchableOpacity>
    </View>
  );

  const _renderWeek = () => (
    <FlatList
      data={weekDates}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 7 }}
      keyExtractor={(item) => item}
      style={StyleSheet.flatten([S.weekContainer])}
      renderItem={({ item }) => {
        const isSelected = item === selectedDate;

        return (
          <TouchableOpacity
            onPress={() => setSelectedDate(item)}
            activeOpacity={0.8}
            style={StyleSheet.flatten([
              S.weekCard,
              {
                backgroundColor: isSelected
                  ? theme.colors.primary
                  : theme.colors.secondaryBackground,
              },
            ])}
          >
            <Text
              style={StyleSheet.flatten([
                S.weekDay,
                {
                  fontFamily: isSelected ? Fonts.bold : Fonts.regular,
                  color: isSelected ? theme.colors.white : theme.colors.black,
                },
              ])}
            >
              {dayjs(item).format("ddd").toUpperCase()}
            </Text>

            <Text
              style={StyleSheet.flatten([
                S.weekDate,
                {
                  color: isSelected ? theme.colors.white : theme.colors.black,
                },
              ])}
            >
              {dayjs(item).format("D")}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );

  const _renderCalendarModal = () => (
    <Modal
      visible={showCalendar}
      transparent
      animationType="slide"
      onRequestClose={() => setShowCalendar(false)}
    >
      <TouchableOpacity
        style={StyleSheet.flatten([S.modalBackdrop])}
        onPress={() => setShowCalendar(false)}
        activeOpacity={0.8}
      >
        <TouchableOpacity
          style={StyleSheet.flatten([S.modalContainer])}
          activeOpacity={0.8}
        >
          <Calendar
            current={selectedDate}
            onDayPress={(day) => {
              const isSunday = dayjs(day.dateString).day() === 0;
              if (isSunday) return;

              setSelectedDate(day.dateString);
              setWeekDates(getWeekDates(day.dateString));
              setShowCalendar(false);
            }}
            disableAllTouchEventsForDisabledDays={true}
            disabledDaysIndexes={[0]}
            theme={{
              selectedDayBackgroundColor: theme.colors.primary,
              selectedDayTextColor: theme.colors.white,

              todayTextColor: theme.colors.white,
              todayBackgroundColor: theme.colors.primary,

              dayTextColor: theme.colors.black,
              textDisabledColor: "#C0C0C0",
              monthTextColor: theme.colors.black,
              textSectionTitleColor: theme.colors.primary,

              arrowColor: theme.colors.primary,
              calendarBackground: theme.colors.white,
            }}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );

  const _renderScheduleHeader = () => {
    return (
      <View style={StyleSheet.flatten([S.scheduleContainer])}>
        <Text
          style={StyleSheet.flatten([S.header, { fontFamily: Fonts.bold }])}
        >
          {HOME_CONFIG.schedules}
        </Text>
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
      {_renderHeader()}
      {_renderWeek()}
      {_renderCalendarModal()}
      {_renderScheduleHeader()}
    </View>
  );
};
