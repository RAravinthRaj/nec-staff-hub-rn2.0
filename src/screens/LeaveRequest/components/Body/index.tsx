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
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useTheme } from "@rneui/themed";
import { styles as S } from "./styles";
import { RadioButton } from "react-native-paper";
import { DropDown } from "../DropDown";
import { DateInput } from "../DateInput";
import ElevatedView from "react-native-elevated-view";
import { Fonts } from "@/assets";
import { LEAVE_REQUEST_CONFIG } from "../../config";
import { DocumentsInput, DocumentItem } from "../Documents";
import { showToast } from "@/utils";

export interface IBody {
  categories: any;
  submitLoading?: boolean;
  onSubmit: (payload: {
    leaveType: "FULL_DAY" | "HALF_DAY";
    categoryId: number;
    startDate: string;
    endDate: string;
    reason: string;
    documents?: DocumentItem[];
  }) => void;
}

export const Body = ({ categories, onSubmit, submitLoading }: IBody) => {
  const { theme } = useTheme();
  const [type, setType] = useState("");
  const [session, setSession] = useState("");
  const [category, setCategory] = useState<any>("");
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [reason, setReason] = useState("");
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  const _renderTitle = (title: string) => {
    return (
      <View style={StyleSheet.flatten([S.headerText])}>
        <Text style={StyleSheet.flatten([S.titleText])}>{title}</Text>

        <Text
          style={StyleSheet.flatten([
            S.typeText,
            { color: theme.colors.red, margin: 5 },
          ])}
        >
          {LEAVE_REQUEST_CONFIG.star}
        </Text>
      </View>
    );
  };

  const _renderTypeRadioButton = (selectedType: string) => {
    const isSelected = type === selectedType;

    return (
      <View
        style={StyleSheet.flatten([
          S.radioButton,
          { opacity: isSelected ? 1 : 0.6 },
        ])}
      >
        <RadioButton
          value={selectedType}
          status={isSelected ? "checked" : "unchecked"}
          onPress={() => setType(selectedType)}
          color={theme.colors.primary}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setType(selectedType)}
        >
          <Text
            style={StyleSheet.flatten([
              S.typeText,
              {
                color: isSelected ? theme.colors.primary : theme.colors.black,
              },
            ])}
          >
            {selectedType}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const _renderSessionRadioButton = (selectedType: string) => {
    const isSelected = session === selectedType;

    return (
      <View
        style={StyleSheet.flatten([
          S.radioButton,
          { opacity: isSelected ? 1 : 0.6 },
        ])}
      >
        <RadioButton
          value={selectedType}
          status={isSelected ? "checked" : "unchecked"}
          onPress={() => setSession(selectedType)}
          color={theme.colors.primary}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setSession(selectedType)}
        >
          <Text
            style={StyleSheet.flatten([
              S.typeText,
              {
                color: isSelected ? theme.colors.primary : theme.colors.black,
              },
            ])}
          >
            {selectedType}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const _renderType = (
    title: string,
    firstChoice: string,
    secondChoice: string
  ) => {
    return (
      <View style={StyleSheet.flatten([S.typeContainer])}>
        {_renderTitle(title)}

        <View style={StyleSheet.flatten([S.typeSubContainer])}>
          {_renderTypeRadioButton(firstChoice)}
          {_renderTypeRadioButton(secondChoice)}
        </View>
      </View>
    );
  };

  const _renderCategory = () => {
    return (
      <View style={StyleSheet.flatten([S.typeContainer])}>
        {_renderTitle(LEAVE_REQUEST_CONFIG.category)}

        <DropDown
          value={category}
          placeholder="-- Select --"
          items={categories}
          onChange={setCategory}
        />
      </View>
    );
  };

  const _renderDate = () => {
    if (type === LEAVE_REQUEST_CONFIG.halfDay) {
      return (
        <View style={StyleSheet.flatten([S.dateContainer])}>
          <View style={StyleSheet.flatten([S.date, { flex: 1 }])}>
            {_renderTitle(LEAVE_REQUEST_CONFIG.date)}
            <DateInput value={fromDate} onChange={setFromDate} />
          </View>
        </View>
      );
    }

    return (
      <View style={StyleSheet.flatten([S.dateContainer])}>
        <View style={StyleSheet.flatten([S.date, { flex: 0.5 }])}>
          {_renderTitle(LEAVE_REQUEST_CONFIG.startDate)}
          <DateInput value={fromDate} onChange={setFromDate} />
        </View>
        <View style={StyleSheet.flatten([S.date, { flex: 0.5 }])}>
          {_renderTitle(LEAVE_REQUEST_CONFIG.endDate)}
          <DateInput value={endDate} onChange={setEndDate} />
        </View>
      </View>
    );
  };

  const _renderSession = (
    title: string,
    firstChoice: string,
    secondChoice: string
  ) => {
    if (type === LEAVE_REQUEST_CONFIG.halfDay) {
      {
        return (
          <View style={StyleSheet.flatten([S.typeContainer])}>
            {_renderTitle(title)}

            <View style={StyleSheet.flatten([S.typeSubContainer])}>
              {_renderSessionRadioButton(firstChoice)}
              {_renderSessionRadioButton(secondChoice)}
            </View>
          </View>
        );
      }
    }
  };

  const _renderReason = (title: string) => {
    return (
      <View style={StyleSheet.flatten([S.typeContainer])}>
        {_renderTitle(title)}

        <ElevatedView
          elevation={2}
          style={StyleSheet.flatten([
            S.textareaContainer,
            {
              borderColor: theme.colors.border,
              fontFamily: Fonts.regular,
            },
          ])}
        >
          <TextInput
            multiline
            textAlignVertical="top"
            placeholder="Please Specify the Reason"
            value={reason}
            onChangeText={setReason}
            style={[
              S.textarea,
              {
                color: theme.colors.black,
                fontFamily: Fonts.regular,
                lineHeight: 35,
              },
            ]}
          />
        </ElevatedView>
      </View>
    );
  };

  const _formatDate = (value?: Date) => {
    if (!value) return "";
    const day = String(value.getDate()).padStart(2, "0");
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const year = value.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const _normalizeLeaveType = () => {
    if (type === LEAVE_REQUEST_CONFIG.fullDay) return "FULL_DAY" as const;
    if (type === LEAVE_REQUEST_CONFIG.halfDay) return "HALF_DAY" as const;
    return null;
  };

  const _handleSubmit = () => {
    const leaveType = _normalizeLeaveType();
    if (!leaveType) {
      showToast("Please select leave type.", "error");
      return;
    }

    const categoryId =
      typeof category === "number" ? category : Number(category);
    if (!categoryId) {
      showToast("Please select leave category.", "error");
      return;
    }

    if (!fromDate) {
      showToast("Please select start date.", "error");
      return;
    }

    if (leaveType === "FULL_DAY" && !endDate) {
      showToast("Please select end date.", "error");
      return;
    }

    if (!reason?.trim()) {
      showToast("Please enter reason.", "error");
      return;
    }

    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    const startDateValue = new Date(
      fromDate.getFullYear(),
      fromDate.getMonth(),
      fromDate.getDate(),
    );

    if (startDateValue.getTime() <= todayStart.getTime()) {
      showToast("Please Provide Proper Date", "error");
      return;
    }

    if (leaveType === "FULL_DAY" && endDate) {
      const endDateValue = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
      );

      if (endDateValue.getTime() <= todayStart.getTime()) {
        showToast("Please Provide Proper Date", "error");
        return;
      }
    }

    const startDate = _formatDate(fromDate);
    const endDateValue =
      leaveType === "HALF_DAY" ? startDate : _formatDate(endDate);

    onSubmit({
      leaveType,
      categoryId,
      startDate,
      endDate: endDateValue,
      reason: reason.trim(),
      documents,
    });
  };

  const _renderButton = () => {
    return (
      <ElevatedView
        style={StyleSheet.flatten([S.buttonContainer])}
        elevation={5}
      >
        <TouchableOpacity
          style={StyleSheet.flatten([
            S.button,
            { backgroundColor: theme.colors.primary },
          ])}
          activeOpacity={0.8}
          onPress={_handleSubmit}
          disabled={submitLoading}
        >
          <Text
            style={StyleSheet.flatten([
              S.buttonTitle,
              { color: theme.colors.white, fontFamily: Fonts.semibold },
            ])}
          >
            {LEAVE_REQUEST_CONFIG.buttonTitle}
          </Text>
        </TouchableOpacity>
      </ElevatedView>
    );
  };

  const _renderInput = () => {
    return (
      <View style={StyleSheet.flatten([S.headerContainer])}>
        {_renderType(
          LEAVE_REQUEST_CONFIG.type,
          LEAVE_REQUEST_CONFIG.fullDay,
          LEAVE_REQUEST_CONFIG.halfDay
        )}
        {_renderCategory()}
        {_renderDate()}
        {_renderSession(
          LEAVE_REQUEST_CONFIG.session,
          LEAVE_REQUEST_CONFIG.morning,
          LEAVE_REQUEST_CONFIG.afternoon
        )}
        {_renderReason(LEAVE_REQUEST_CONFIG.reason)}
        <DocumentsInput onChange={setDocuments} />
        {_renderButton()}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        style={StyleSheet.flatten([
          S.container,
          { backgroundColor: theme.colors.white },
        ])}
      >
        {_renderInput()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
