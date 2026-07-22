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

const MOCK_PROFILE = {
  name: "Aravinth Raj",
  gender: "Male",
  designation: "Assistant Professor",
  email: "hod@nec.edu.in",
  phone: "+91 98765 43210",
  rollNumber: "NEC-HOD-001",
  birthday: "1998-05-23",
};

export const ProfileScreen = ({ onLogout }: { onLogout?: () => void }) => {
  const _handleLogout = () => {
    showToast("Logout Successful", "success");
    onLogout?.();
  };

  const _renderProfile = () => {
    return (
      <ScrollView>
        <Body data={MOCK_PROFILE} />
        <UserDetails
          userDetails={MOCK_PROFILE}
          handleLogOut={_handleLogout}
          notificationsEnabled={false}
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
