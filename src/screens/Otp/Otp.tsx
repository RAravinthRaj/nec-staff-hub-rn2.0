/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { PageContainer, LogoHeader, Footer, Loader } from "@/components";
import { Body } from "./components";
import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";
import { showToast } from "@/utils/toast";
import { useAuthStore, UserProfile } from "@/store/useAuthStore";
import { AuthApi } from "@/services/authApi";

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

    try {
      setLoading(true);
      const res = await AuthApi.sendOTP(email);
      showToast(res?.message || "OTP resent successfully", "success");
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || err?.message || "Failed to resend OTP";
      showToast(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  const _handleVerifyOtp = async (otp: string) => {
    if (!otp) {
      showToast("Please enter OTP", "error");
      return;
    }

    try {
      setLoading(true);
      const res = await AuthApi.verifyOTP(email, otp);
      const roleName = res?.role || "Staff";
      const normalizedRole = roleName === "Department Admin" ? "HOD" : "STAFF";

      const userProfile: UserProfile = {
        userId: res?.user?.userId,
        email: res?.user?.email || email,
        name: res?.user?.userName || "Staff User",
        role: normalizedRole,
        staffId: String(res?.user?.staffId || "1"),
      };

      await useAuthStore.getState().loginSuccess(res.token, userProfile);
      showToast("Sign in Success", "success");
      onLoginSuccess?.();
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || err?.message || "OTP Verification Failed";
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
