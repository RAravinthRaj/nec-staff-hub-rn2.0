/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Images, Fonts } from "@/assets";
import { styles as S } from "./styles";
import { OTP_CONFIG } from "../../config";
import { useTheme } from "@rneui/themed";
import ElevatedView from "react-native-elevated-view";
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { showToast } from "@/utils";

export interface IBody {
  email: string;
  onVerifyOtp: (otp: string) => void;
  onResendOtp: () => void;
}

export const Body = ({ email, onVerifyOtp, onResendOtp }: IBody) => {
  const { theme } = useTheme();
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (otp.length !== 4) {
      showToast("Invalid Otp", "error");
      return;
    }
    onVerifyOtp(otp);
  };

  const _renderImage = () => (
    <View style={S.imageContainer}>
      <Image source={Images.otp} style={S.otpImage} />
    </View>
  );

  const _renderText = () => (
    <View style={S.textContainer}>
      <Text style={[S.header, { fontFamily: Fonts.bold }]}>
        {OTP_CONFIG.header}
      </Text>

      <View style={S.descriptionContainer}>
        <Text style={[S.description, { fontFamily: Fonts.regular }]}>
          {OTP_CONFIG.description}
        </Text>
      </View>
    </View>
  );

  const _renderOtpInput = () => (
    <SafeAreaProvider>
      <SafeAreaView style={S.otpMainContainer}>
        <OtpInput
          numberOfDigits={4}
          onTextChange={setOtp}
          textInputProps={{
            returnKeyType: "send",
            onSubmitEditing: handleVerify,
          }}
          theme={{
            containerStyle: S.otpContainer,
            pinCodeContainerStyle: [
              S.otpInput,
              { backgroundColor: theme.colors.secondaryBackground },
            ] as any,
            pinCodeTextStyle: {
              color: theme.colors.black,
            },
            focusedPinCodeContainerStyle: {
              borderWidth: 2,
              borderColor: theme.colors.primary,
            },
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );

  const _renderVerifyButton = () => (
    <ElevatedView style={S.buttonContainer} elevation={2}>
      <TouchableOpacity
        style={[
          S.button,
          {
            backgroundColor:
              otp.length === 4 ? theme.colors.primary : theme.colors.border,
          },
        ]}
        onPress={handleVerify}
        disabled={otp.length !== 4}
        activeOpacity={0.8}
      >
        <Text
          style={[
            S.buttonTitle,
            { color: theme.colors.white, fontFamily: Fonts.semibold },
          ]}
        >
          {OTP_CONFIG.buttonTitle}
        </Text>
      </TouchableOpacity>
    </ElevatedView>
  );

  const _renderResendSection = () => (
    <View style={S.resendContainer}>
      <Text
        style={[
          S.resend,
          { color: theme.colors.black, fontFamily: Fonts.regular },
        ]}
      >
        {OTP_CONFIG.otpResend}
      </Text>

      <Pressable onPress={onResendOtp}>
        {({ pressed }) => (
          <Text
            style={[
              S.resend,
              { color: theme.colors.primary, fontFamily: Fonts.semibold },
              pressed && { textDecorationLine: "underline" },
            ]}
          >
            {OTP_CONFIG.resend}
          </Text>
        )}
      </Pressable>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView style={S.container} showsVerticalScrollIndicator={false}>
        {_renderImage()}
        {_renderText()}
        {_renderOtpInput()}
        {_renderVerifyButton()}
        {_renderResendSection()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
