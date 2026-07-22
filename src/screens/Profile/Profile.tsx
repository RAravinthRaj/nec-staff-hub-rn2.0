/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { ScrollView } from "react-native";
import { PageContainer } from "@/components";
import { Body, Header, UserDetails } from "./components";
import { showToast } from "@/utils";
import { useAuthStore } from "@/store/useAuthStore";

export const ProfileScreen = ({ onLogout }: { onLogout?: () => void }) => {
  const user = useAuthStore((state) => state.user);

  const profileData = {
    name: user?.name || "R. Aravinth Raj",
    gender: "Male",
    designation: user?.designation || "Assistant Professor",
    email: user?.email || "staff@nec.edu.in",
    phone: user?.phone || "+91 98765 12345",
    rollNumber: user?.staffId || "NEC-STF-102",
    birthday: "1995-08-15",
  };

  const _handleLogout = () => {
    showToast("Logout Successful", "success");
    onLogout?.();
  };

  const _renderProfile = () => {
    return (
      <ScrollView>
        <Body data={profileData} />
        <UserDetails
          userDetails={profileData}
          handleLogOut={_handleLogout}
          notificationsEnabled={true}
        />
      </ScrollView>
    );
  };

  return (
    <>
      <Header />
      <PageContainer isLightStatusBar>{_renderProfile()}</PageContainer>
    </>
  );
};
