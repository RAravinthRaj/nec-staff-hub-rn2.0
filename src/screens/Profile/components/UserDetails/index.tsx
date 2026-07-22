/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Icon, useTheme, BottomSheet } from "@rneui/themed";
import { styles as S } from "./styles";
import { PROFILE_CONFIG } from "../../config";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import dayjs from "dayjs";
import { setPushNotificationsEnabled } from "@/utils";
import { Linking } from "react-native";

export interface IUserDetails {
  userDetails: any;
  handleLogOut: () => void;
  notificationsEnabled: boolean;
}

export const UserDetails = ({
  userDetails,
  handleLogOut,
  notificationsEnabled,
}: IUserDetails) => {
  const { theme } = useTheme();
  const [isEnabled, setIsEnabled] = useState(notificationsEnabled);
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    setIsEnabled(notificationsEnabled);
  }, [notificationsEnabled]);

  const toggleSwitch = async () => {
    const nextValue = !isEnabled;
    setIsEnabled(nextValue);
    await setPushNotificationsEnabled(nextValue);
  };

  const _viewAbout = () => {
    Linking.openURL("https://nec.edu.in/");
    console.log("About");
  };

  const _viewPrivacy = () => {
    Linking.openURL("https://nec.edu.in/");
    console.log("Privacy");
  };

  const _viewTerms = () => {
    Linking.openURL("https://nec.edu.in/");
    console.log("Terms");
  };

  const toggleLogOut = () => {
    setIsVisible(!isVisible);
  };

  const _logOut = () => {
    setIsVisible(false);
    handleLogOut();

    return;
  };

  const actionMap: Record<string, () => void> = {
    about: _viewAbout,
    privacy: _viewPrivacy,
    terms: _viewTerms,
    logout: toggleLogOut,
  };

  const _renderLogOut = () => {
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
          <View style={StyleSheet.flatten([S.handle])} />

          <View style={StyleSheet.flatten([S.bottomTextContainer])}>
            <Text style={StyleSheet.flatten([S.bottomText])}>
              {PROFILE_CONFIG.logOut}
            </Text>
            <Text style={StyleSheet.flatten([S.bottomSubText])}>
              {PROFILE_CONFIG.logOutConfirmation}
            </Text>
          </View>

          <View style={StyleSheet.flatten([S.bottomButtonContainer])}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsVisible(false)}
              style={StyleSheet.flatten([
                S.button,
                { borderColor: theme.colors.primary, borderWidth: 2 },
              ])}
            >
              <Text
                style={StyleSheet.flatten([
                  S.dataText,
                  { color: theme.colors.primary },
                ])}
              >
                {PROFILE_CONFIG.noCancel}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={_logOut}
              style={StyleSheet.flatten([
                S.button,
                { backgroundColor: theme.colors.primary },
              ])}
            >
              <Text
                style={StyleSheet.flatten([
                  S.dataText,
                  { color: theme.colors.white },
                ])}
              >
                {PROFILE_CONFIG.logOut}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    );
  };

  const _renderSwitch = () => {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={StyleSheet.flatten([S.switchContainer])}>
          <Switch
            value={isEnabled}
            onValueChange={toggleSwitch}
            trackColor={{
              false: theme.colors.background,
              true: theme.colors.tertiary,
            }}
            thumbColor={isEnabled ? theme.colors.primary : theme.colors.border}
            ios_backgroundColor="#FFFFFF"
            style={{
              transform: [{ scaleX: 1 }, { scaleY: 1 }],
              borderWidth: 1.5,
              borderColor: theme.colors.black,
              borderRadius: 20,
            }}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  };

  const _renderSingleData = (
    isGeneral: boolean,
    index: number,
    data: any,
    isLast: boolean,
  ) => {
    if (!isGeneral) {
      const identifier = data?.name;
      let userData = userDetails?.[identifier];

      if (identifier === "birthday") {
        userData = dayjs(userData).format("MMMM D, YYYY");
      }

      return (
        <View
          key={index}
          style={StyleSheet.flatten([
            S.data,
            {
              backgroundColor:
                index % 2 == 0
                  ? theme.colors.tertiaryBackground
                  : theme.colors.white,
              borderTopLeftRadius: index == 0 ? 10 : 0,
              borderTopRightRadius: index == 0 ? 10 : 0,
              borderBottomLeftRadius: isLast ? 10 : 0,
              borderBottomRightRadius: isLast ? 10 : 0,
            },
          ])}
        >
          <Icon type={data.type} name={data.icon} color="black" size={22} />
          <Text style={StyleSheet.flatten([S.dataText])}>{userData}</Text>
        </View>
      );
    }

    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.8}
        onPress={() => actionMap[data.action]?.()}
        style={StyleSheet.flatten([
          S.data,
          {
            borderRadius: 10,
            justifyContent: "space-between",
            backgroundColor:
              index % 2 == 0
                ? theme.colors.tertiaryBackground
                : theme.colors.white,
            borderTopLeftRadius: index == 0 ? 10 : 0,
            borderTopRightRadius: index == 0 ? 10 : 0,
            borderBottomLeftRadius: isLast ? 10 : 0,
            borderBottomRightRadius: isLast ? 10 : 0,
          },
        ])}
      >
        <View
          style={StyleSheet.flatten([
            {
              display: "flex",
              flexDirection: "row",
              gap: 20,
            },
          ])}
        >
          <Icon type={data.type} name={data.icon} color="black" size={22} />
          <Text style={StyleSheet.flatten([S.dataText])}>{data.name}</Text>
        </View>

        <View>
          <Icon
            type="entypo"
            name="chevron-thin-right"
            size={12}
            color="black"
          />
        </View>
      </TouchableOpacity>
    );
  };

  const _renderData = (title: string, data: any, isGeneral: boolean) => {
    return (
      <View style={StyleSheet.flatten([S.detailContainer])}>
        <View style={StyleSheet.flatten([S.textContainer])}>
          <Text
            style={StyleSheet.flatten([
              S.titleText,
              { color: theme.colors.black },
            ])}
          >
            {title}
          </Text>
        </View>
        <View
          style={StyleSheet.flatten([
            S.dataContainer,
            { borderColor: theme.colors.border },
          ])}
        >
          {data.map((d: any, index: any) => {
            return _renderSingleData(
              isGeneral,
              index,
              d,
              index === data.length - 1,
            );
          })}
        </View>
      </View>
    );
  };

  const _renderNotifications = () => {
    return (
      <View style={StyleSheet.flatten([S.detailContainer])}>
        <View style={StyleSheet.flatten([S.textContainer])}>
          <Text
            style={StyleSheet.flatten([
              S.titleText,
              { color: theme.colors.black },
            ])}
          >
            {PROFILE_CONFIG.settings}
          </Text>
        </View>
        <View
          style={StyleSheet.flatten([
            S.dataContainer,
            { borderColor: theme.colors.black, borderWidth: 0.2 },
          ])}
        >
          <View
            style={StyleSheet.flatten([
              S.data,
              {
                backgroundColor: theme.colors.tertiaryBackground,
                borderRadius: 10,
                justifyContent: "space-between",
              },
            ])}
          >
            <View
              style={StyleSheet.flatten([
                {
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                },
              ])}
            >
              <Icon
                type="materials-icon"
                name="notifications-active"
                size={24}
                color="black"
              />
              <Text style={StyleSheet.flatten([S.dataText])}>
                {PROFILE_CONFIG.notifications}
              </Text>
            </View>

            <View>{_renderSwitch()}</View>
          </View>
        </View>
      </View>
    );
  };

  const _renderDetails = () => {
    return (
      <View style={StyleSheet.flatten([S.headerContainer])}>
        {_renderData(
          PROFILE_CONFIG.accountDetails,
          PROFILE_CONFIG.accountDetailsData,
          false,
        )}
        {_renderNotifications()}
        {_renderData(PROFILE_CONFIG.general, PROFILE_CONFIG.generalData, true)}
        {_renderLogOut()}
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
      {_renderDetails()}
    </View>
  );
};
