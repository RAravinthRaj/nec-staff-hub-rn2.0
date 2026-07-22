/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Icon, useTheme } from "@rneui/themed";
import { styles as S } from "./styles";
import { LEAVE_INTIMATION_CONFIG } from "../../config";
import ElevatedView from "react-native-elevated-view";
import { Fonts, Images } from "@/assets";

export interface ILeaveDetails {
  leaveDetails: any;
  navigateToLeaveDetails: (leave: any) => void;
}

export const LeaveDetails = ({
  leaveDetails,
  navigateToLeaveDetails,
}: ILeaveDetails) => {
  const { theme } = useTheme();

  const formatDate = (dateStr: string): string => {
    const [day, month, year] = dateStr.split(".").map(Number);
    const date = new Date(year, month - 1, day);

    return `${LEAVE_INTIMATION_CONFIG.days[date.getDay()]}, ${date.getDate()} ${
      LEAVE_INTIMATION_CONFIG.months[date.getMonth()]
    }`;
  };

  const _renderButton = () => {
    return (
      <TouchableOpacity
        style={StyleSheet.flatten([
          S.button,
          {
            backgroundColor: theme.colors.background,
          },
        ])}
        activeOpacity={0.8}
        onPress={navigateToLeaveDetails}
      >
        <Icon type="feather" name="chevron-right" size={20} color="black" />
      </TouchableOpacity>
    );
  };

  const _renderStatus = (status: any) => {
    const textColor = LEAVE_INTIMATION_CONFIG.color[status.toLowerCase()];
    const background = textColor + "Background";

    return (
      <ElevatedView
        style={StyleSheet.flatten([
          S.statusContainer,
          {
            backgroundColor: theme.colors[background],
          },
        ])}
      >
        <Text
          style={StyleSheet.flatten([
            S.statusText,
            {
              color: theme.colors[textColor],
              fontFamily: Fonts.regular,
            },
          ])}
        >
          {status}
        </Text>
      </ElevatedView>
    );
  };

  const _renderDate = (startDate: any, endDate: any) => {
    if (startDate === endDate) {
      return formatDate(startDate);
    }

    return formatDate(startDate) + " - " + formatDate(endDate);
  };

  const _renderUserData = (
    facultyName: string,
    designation: string,
    departmentName?: string,
    departmentAbbreviation?: string,
    gender?: string,
  ) => {
    const dept =
      departmentAbbreviation && departmentAbbreviation.length > 0
        ? `Dept of ${departmentAbbreviation}`
        : departmentName;

    const genderLower = (gender || "").toLowerCase();
    const prefix =
      genderLower === "male"
        ? "Mr. "
        : genderLower === "female"
          ? "Ms. "
          : "";

    const details = [designation, dept]
      .filter((v) => v && v.length > 0)
      .join(", ");

    return (
      <View
        style={StyleSheet.flatten([
          S.userDataLeaveContainer,
          {
            padding: 10,
            backgroundColor: theme.colors.tertiaryBackground,
            borderTopColor: theme.colors.border,
            borderTopWidth: 1,
          },
        ])}
      >
        <View
          style={StyleSheet.flatten([
            S.userSubDataLeaveContainer,
            {
              marginLeft: 30,
              gap: 20,
            },
          ])}
        >
          <View style={S.byTextContainer}>
            <Text
              style={StyleSheet.flatten([
                S.byText,
                { color: theme.colors.primary },
              ])}
            >
              {LEAVE_INTIMATION_CONFIG.by}
            </Text>
          </View>
          <View style={S.dataDescription}>
            <Text style={S.byText}>
              {`${prefix}${facultyName || ""}`.trim()}
            </Text>
            <Text style={S.descriptionText}>{details || designation}</Text>
          </View>
        </View>

        {_renderButton()}
      </View>
    );
  };

  const _renderData = () => {
    return (
      <View style={StyleSheet.flatten([S.headerContainer])}>
        {Object.entries(leaveDetails).map(([month, leaves]: any, mIndex) => (
          <View key={mIndex} style={StyleSheet.flatten([S.mainLeaveContainer])}>
            <Text
              style={StyleSheet.flatten([
                S.monthText,
                {
                  color: theme.colors.black,
                  opacity: 0.5,
                },
              ])}
            >
              {month}
            </Text>

            {leaves.map((leave: any, index: number) => {
              const status = leave?.status;

              return (
                <TouchableOpacity
                  key={`${mIndex}-${index}`}
                  style={StyleSheet.flatten([
                    S.leaveContainer,
                    {
                      backgroundColor: theme.colors.white,
                      borderColor:
                        theme.colors[
                          LEAVE_INTIMATION_CONFIG.color[status.toLowerCase()]
                        ],
                    },
                  ])}
                  onPress={() => {
                    navigateToLeaveDetails(leave);
                  }}
                  activeOpacity={1}
                >
                  <View style={StyleSheet.flatten([S.subLeaveContainer])}>
                    <View style={StyleSheet.flatten([S.subLeaveContainer])}>
                      <View>
                        <Image
                          source={Images.profile}
                          style={StyleSheet.flatten([S.image])}
                        />
                      </View>
                      <View
                        style={StyleSheet.flatten([S.descriptionContainer])}
                      >
                        <View style={StyleSheet.flatten([S.description])}>
                          <Text
                            style={StyleSheet.flatten([
                              S.typeText,
                              { color: theme.colors.black, opacity: 0.4 },
                            ])}
                          >
                            {leave?.type}
                          </Text>

                          <Text
                            style={StyleSheet.flatten([
                              S.dateText,
                              { color: theme.colors.black, opacity: 0.7 },
                            ])}
                          >
                            {_renderDate(leave?.startDate, leave?.endDate)}
                          </Text>
                        </View>

                        <Text
                          style={StyleSheet.flatten([
                            S.categoryText,
                            { color: theme.colors.primary, opacity: 0.7 },
                          ])}
                        >
                          {leave?.category}
                        </Text>
                      </View>
                    </View>

                    <View style={StyleSheet.flatten([S.mainStatusContainer])}>
                      {_renderStatus(status)}
                    </View>
                  </View>

                  <View style={StyleSheet.flatten([S.userDataLeaveContainer])}>
                    {_renderUserData(
                      leave?.facultyName,
                      leave?.designation,
                      leave?.departmentName,
                      leave?.departmentAbbreviation,
                      leave?.gender,
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
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
