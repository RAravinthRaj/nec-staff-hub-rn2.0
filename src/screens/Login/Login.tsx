/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { PageContainer, LogoHeader, Footer, Loader } from "@/components";
import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";
import { Body } from "./components";
import { showToast } from "@/utils/toast";
import { AuthApi } from "@/services/authApi";
import { useAuthStore, UserProfile } from "@/store/useAuthStore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { config } from "@/config";

export const LoginScreen = ({ navigation }: any) => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (config.googleWebClientId) {
      GoogleSignin.configure({
        webClientId: config.googleWebClientId,
      });
    }

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
    const targetEmail = email.trim();
    if (!targetEmail) {
      showToast("Please enter your email address", "error");
      return;
    }

    try {
      setLoading(true);
      const res = await AuthApi.sendOTP(targetEmail);
      showToast("OTP sent successfully", "success");
      navigation.navigate("Otp", { email: targetEmail });
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || err?.message || "Failed to send OTP";
      showToast(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  const _handleGoogleLogin = async () => {
    try {
      setLoading(true);

      // Force account chooser every time by signing out previous session first
      try {
        await GoogleSignin.signOut();
      } catch (e) {
        // Ignore if no active session existed
      }

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken || undefined;
      const googleEmail = userInfo.data?.user?.email || email.trim();

      const res = await AuthApi.googleLogin({
        idToken,
        email: googleEmail,
      });

      const roleName = res?.role || "Staff";
      const normalizedRole = roleName === "Department Admin" ? "HOD" : "STAFF";

      const userProfile: UserProfile = {
        userId: res?.user?.userId,
        email: res?.user?.email || googleEmail,
        name: res?.user?.userName || "Staff User",
        role: normalizedRole,
        staffId: String(res?.user?.staffId || "1"),
      };

      await useAuthStore.getState().loginSuccess(res.token, userProfile);
      showToast("Sign in Success", "success");
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || err?.message || "Google Sign-In failed";
      showToast(errorMsg, "error");
    } finally {
      setLoading(false);
    }
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

      {loading && <Loader useModalLoader />}
      {!keyboardOpen && <Footer />}
    </>
  );
};
