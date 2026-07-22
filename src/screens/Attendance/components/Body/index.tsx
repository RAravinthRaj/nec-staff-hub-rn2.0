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
  FlatList,
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
}

export const Body = ({
  statsData,
  markAllAbsent,
  markAllPresent,
  searchStudents,
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

  const _renderCard = ({ item }: any) => {
    return (
      <View
        style={StyleSheet.flatten([
          S.card,
          { backgroundColor: (theme.colors as any)[item.color] },
        ])}
      >
        <View style={StyleSheet.flatten([S.imageContainer])}>
          <Image
            source={(Images as any)[item.image]}
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
            {item?.description}
          </Text>
        </View>
      </View>
    );
  };

  const _renderStatistics = () => {
    return (
      <FlatList
        data={ATTENDANCE_CONFIG.statsDetails}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        renderItem={_renderCard}
        columnWrapperStyle={{ gap: 5 }}
        contentContainerStyle={StyleSheet.flatten([S.headerContainer])}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
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

          <View style={StyleSheet.flatten([S.bottomButtonContainer])}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                _changeAttendanceStatus("absent");
              }}
              style={StyleSheet.flatten([
                S.button,
                { borderColor: theme.colors.primary, borderWidth: 2 },
              ])}
            >
              <Text
                style={StyleSheet.flatten([
                  S.text,
                  { color: theme.colors.primary },
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
                { backgroundColor: theme.colors.primary },
              ])}
            >
              <Text
                style={StyleSheet.flatten([
                  S.text,
                  { color: theme.colors.white },
                ])}
              >
                {ATTENDANCE_CONFIG.markAllPresent}
              </Text>
            </TouchableOpacity>
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
          <Icon name="dots-three-vertical" type="entypo" size={25} />
        </TouchableOpacity>
        {_renderMenu()}
      </View>
    );
  };

  const _renderTitle = () => {
    return (
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
          <Text
            style={StyleSheet.flatten([
              S.titleText,
              { color: theme.colors.white },
            ])}
          >
            {ATTENDANCE_CONFIG.roll}
          </Text>
          <Text
            style={StyleSheet.flatten([
              S.titleText,
              { color: theme.colors.white },
            ])}
          >
            {ATTENDANCE_CONFIG.number}
          </Text>
        </View>

        <View style={StyleSheet.flatten([S.titleItem])}>
          <Text
            style={StyleSheet.flatten([
              S.titleText,
              { color: theme.colors.white },
            ])}
          >
            {ATTENDANCE_CONFIG.name}
          </Text>
        </View>

        <View style={StyleSheet.flatten([S.titleItem])}>
          <Text
            style={StyleSheet.flatten([
              S.titleText,
              { color: theme.colors.white },
            ])}
          >
            {ATTENDANCE_CONFIG.status}
          </Text>
        </View>
      </View>
    );
  };

  const _renderHeader = () => {
    return (
      <View
        style={StyleSheet.flatten([
          S.headerContainer,
          { backgroundColor: theme.colors.white },
        ])}
      >
        {_renderStatistics()}
        {_renderSearchBar()}
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
      {_renderTitle()}
    </View>
  );
};
