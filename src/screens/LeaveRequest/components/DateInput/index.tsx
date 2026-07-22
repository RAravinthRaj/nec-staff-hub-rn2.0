/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "./styles";
import { useTheme } from "@rneui/themed";

interface DateInputProps {
  value?: Date;
  placeholder?: string;
  onChange: (date: Date) => void;
}

export const DateInput = ({
  value,
  placeholder = "DD/MM/YYYY",
  onChange,
}: DateInputProps) => {
  const { theme } = useTheme();
  const [show, setShow] = useState(false);

  const onDateChange = (_: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const formattedDate = value
    ? `${String(value.getDate()).padStart(2, "0")}/${String(
        value.getMonth() + 1
      ).padStart(2, "0")}/${value.getFullYear()}`
    : placeholder;

  return (
    <View>
      <TouchableOpacity
        style={StyleSheet.flatten([
          styles.container,
          { borderColor: theme.colors.border },
        ])}
        activeOpacity={0.8}
        onPress={() => setShow(true)}
      >
        <Text
          style={StyleSheet.flatten([
            styles.text,
            !value && { color: theme.colors.black, opacity: 0.6 },
          ])}
        >
          {formattedDate}
        </Text>

        <Icon name="calendar-today" size={20} color={theme.colors.border} />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display={"spinner"}
          onChange={onDateChange}
        />
      )}
    </View>
  );
};
