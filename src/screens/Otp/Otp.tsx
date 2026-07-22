// /*
// © 2025 Aravinth Raj R. All rights reserved.
// Unauthorized copying of this file, via any medium, is strictly prohibited.
// Proprietary and confidential.
// Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
// */

import { PageContainer, LogoHeader, Footer, Loader } from "@/components";
import { Body } from "./components";
import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";
import { showToast } from "@/utils/toast";

export const OtpScreen = ({ route, onLoginSuccess }: any) => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const { email } = route.params || {};
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => setKeyboardOpen(true),
    );

    const hideSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setKeyboardOpen(false),
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const _handleResendOtp = async () => {
    if (!email) {
      showToast("Email is missing", "error");
      return;
    }

    showToast("Demo OTP resent. Use 1234.", "success");
  };

  const _handleVerifyOtp = async (otp: string) => {
    if (otp !== "1234") {
      showToast("Use demo OTP 1234", "error");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      showToast("Login Successful", "success");
      onLoginSuccess?.();
    }, 300);
  };

  return (
    <>
      <PageContainer isLightStatusBar={false}>
        <LogoHeader />
        <Body
          email={email}
          onVerifyOtp={_handleVerifyOtp}
          onResendOtp={_handleResendOtp}
        />
      </PageContainer>

      {loading && <Loader useModalLoader />}

      {!keyboardOpen && <Footer />}
    </>
  );
};
