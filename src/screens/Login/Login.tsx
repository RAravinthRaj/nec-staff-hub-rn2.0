/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { PageContainer, LogoHeader, Footer } from "@/components";
import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";
import { Body } from "./components";
import { showToast } from "@/utils/toast";

export const LoginScreen = ({ navigation }: any) => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [email, setEmail] = useState("");

  const _navigateToLogin = () => {
    return navigation.navigate("Otp", { email: email });
  };

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

  const _handleSendOtp = async () => {
    if (!email) {
      showToast("Email is required", "error");
      return;
    }

    showToast("Demo OTP is 1234", "success");
    _navigateToLogin();
  };

  const _handleGoogleLogin = async () => {
    const demoEmail = email || "hod@nec.edu.in";
    showToast("Google login is disabled in frontend-only mode.", "info");
    return navigation.navigate("Otp", { email: demoEmail });
  };

  return (
    <>
      <PageContainer isLightStatusBar={false}>
        <LogoHeader />
        <Body
          navigateToOtp={_handleSendOtp}
          handleGoogleLogin={_handleGoogleLogin}
          setEmail={setEmail}
        />
      </PageContainer>

      {!keyboardOpen && <Footer />}
    </>
  );
};
