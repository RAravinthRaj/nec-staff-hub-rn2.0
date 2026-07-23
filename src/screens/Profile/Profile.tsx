/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { PageContainer, Loader } from "@/components";
import { Body, Header, UserDetails } from "./components";
import { showToast } from "@/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useProfileStore } from "./stores";

export const ProfileScreen = ({ onLogout }: { onLogout?: () => void }) => {
  const user = useAuthStore((state) => state.user);
  const { profile, profileLoading, fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile().catch(() => {
      // Fallback silently to local store user profile if GraphQL profile fetch fails
    });
  }, [fetchProfile]);

  const profileData = {
    name: profile?.name || user?.name || "R. Aravinth Raj",
    gender: (profile as any)?.gender || "Male",
    designation: profile?.designation ? profile.designation.split(",")[0].trim() : user?.designation || "Assistant Professor",
    department: (profile as any)?.department || "Computer Science and Engineering",
    email: profile?.email || user?.email || "aravinthr239@gmail.com",
    phone: profile?.phone_no || user?.phone || "+91 98765 43210",
    rollNumber: profile?.roll_no ? String(profile.roll_no) : user?.staffId || "NEC-STF-101",
    birthday: profile?.date_of_birth || "1995-08-15",
    profilePhoto: profile?.profile_image || (user as any)?.profileImage || null,
  };

  const _handleLogout = async () => {
    await useAuthStore.getState().logout();
    showToast("Logout Successful", "success");
    onLogout?.();
  };

  if (profileLoading && !profile) {
    return (
      <>
        <Header />
        <PageContainer isLightStatusBar>
          <Loader />
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <Header />
      <PageContainer isLightStatusBar>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Body data={profileData} />
          <UserDetails
            userDetails={profileData}
            handleLogOut={_handleLogout}
            notificationsEnabled={true}
          />
        </ScrollView>
      </PageContainer>
    </>
  );
};
