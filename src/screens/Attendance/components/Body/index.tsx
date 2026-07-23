/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { BottomSheet, Icon, useTheme } from "@rneui/themed";
import { styles as S } from "./styles";
import { Fonts, Images } from "@/assets";
import { ATTENDANCE_CONFIG } from "../../config";
import ElevatedView from "react-native-elevated-view";

export interface IBody {
  statsData: any;
  markAllPresent: () => void;
  markAllAbsent: () => void;
  searchStudents: (query: string) => void;
  openCopyModal?: () => void;
}

export const Body = ({
  statsData,
  markAllAbsent,
  markAllPresent,
  searchStudents,
  openCopyModal,
}: IBody) => {
  const { theme } = useTheme();
  const [searchData, setSearchData] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const _changeAttendanceStatus = (status: string) => {
    if (status === "present") {
      markAllPresent();
      setIsVisible(false);
      return;
    }

    markAllAbsent();
    setIsVisible(false);
  };

  useEffect(() => {
    searchStudents(searchData);
  }, [searchData]);

  const _renderStatistics = () => {
    return (
      <View style={S.statsGridContainer}>
        {ATTENDANCE_CONFIG.statsDetails.map((item) => {
          const bg = (theme.colors as any)[item.color] || item.color;
          return (
            <View
              key={item.image}
              style={StyleSheet.flatten([S.card, { backgroundColor: bg }])}
            >
              <View style={S.imageContainer}>
                <Image
                  source={(Images as any)[item.image]}
                  style={S.image}
                  resizeMode="contain"
                />
              </View>
              <View style={S.detailContainer}>
                <Text
                  style={StyleSheet.flatten([
                    S.detail,
                    { color: theme.colors.white, fontFamily: Fonts.bold },
                  ])}
                >
                  {statsData[item.image] ?? 0}
                </Text>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={StyleSheet.flatten([
                    S.description,
                    { color: theme.colors.white, fontFamily: Fonts.semibold },
                  ])}
                >
                  {item?.description}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const _renderSearchIcon = () => {
    if (!searchData) return null;

    return (
      <View
        style={StyleSheet.flatten([S.icons])}
        onStartShouldSetResponderCapture={() => true}
        onTouchStart={() => {
          setSearchData("");
        }}
      >
        <Icon
          name="close"
          type="ionicons"
          size={17}
          color="white"
          style={StyleSheet.flatten([
            S.search,
            { backgroundColor: theme.colors.secondary },
          ])}
        />
      </View>
    );
  };

  const _renderMenu = () => {
    return (
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
              {ATTENDANCE_CONFIG.modalTitle}
            </Text>
            <Text style={StyleSheet.flatten([S.bottomSubText])}>
              {ATTENDANCE_CONFIG.modalSubTitle}
            </Text>
          </View>

          <View style={StyleSheet.flatten([S.bottomButtonContainer, { flexDirection: "column", gap: 10, width: "100%" }])}>
            <View style={{ flexDirection: "row", gap: 10, width: "100%" }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  _changeAttendanceStatus("absent");
                }}
                style={StyleSheet.flatten([
                  S.button,
                  { flex: 1, borderColor: theme.colors.primary, borderWidth: 2 },
                ])}
              >
                <Text
                  style={StyleSheet.flatten([
                    S.text,
                    { color: theme.colors.primary, textAlign: "center" },
                  ])}
                >
                  {ATTENDANCE_CONFIG.markAllAbsent}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  _changeAttendanceStatus("present");
                }}
                style={StyleSheet.flatten([
                  S.button,
                  { flex: 1, backgroundColor: theme.colors.primary },
                ])}
              >
                <Text
                  style={StyleSheet.flatten([
                    S.text,
                    { color: theme.colors.white, textAlign: "center" },
                  ])}
                >
                  {ATTENDANCE_CONFIG.markAllPresent}
                </Text>
              </TouchableOpacity>
            </View>

            {openCopyModal && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setIsVisible(false);
                  openCopyModal();
                }}
                style={StyleSheet.flatten([
                  S.button,
                  {
                    width: "100%",
                    backgroundColor: theme.colors.secondaryBackground,
                    borderWidth: 1.5,
                    borderColor: theme.colors.primary,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ])}
              >
                <Text
                  style={StyleSheet.flatten([
                    S.text,
                    { color: theme.colors.primary, fontFamily: Fonts.semibold, textAlign: "center" },
                  ])}
                >
                  Copy Attendance
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </BottomSheet>
    );
  };

  const _renderSearchBar = () => {
    return (
      <View style={StyleSheet.flatten([S.searchBarContainer])}>
        <ElevatedView
          elevation={3}
          style={StyleSheet.flatten([
            S.searchBarElevatedContainer,
            {
              borderRadius: 12,
            },
          ])}
        >
          <TextInput
            style={StyleSheet.flatten([
              S.input,
              {
                borderColor: theme.colors.border,
                borderWidth: 0,
                borderRadius: 12,
              },
            ])}
            returnKeyType="send"
            placeholderTextColor={theme.colors.border}
            placeholder="Search Name, Roll No..."
            onChangeText={(text) => {
              setSearchData(text);
            }}
            value={searchData}
            autoFocus={false}
            onSubmitEditing={() => console.log("Submitted")}
          />
          {_renderSearchIcon()}
        </ElevatedView>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
          }}
          activeOpacity={0.2}
          hitSlop={{ left: 20 }}
        >
          <Icon
            name="dots-three-vertical"
            type="entypo"
            size={18}
            color={theme.colors.black}
            style={StyleSheet.flatten([
              S.search,
              { backgroundColor: theme.colors.white },
            ])}
          />
        </TouchableOpacity>
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
      {_renderStatistics()}
      {_renderSearchBar()}
      {_renderMenu()}
    </View>
  );
};
