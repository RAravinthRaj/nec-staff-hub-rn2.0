/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { Loader, NoDataFound, PageContainer } from "@/components";
import { Body, Header, LeaveDetails } from "./components";
import { LEAVE_APPROVAL_CONFIG } from "./config";
import { ScrollView } from "react-native";
import { useLeaveApprovalStore } from "./stores";
import { useEffect, useState } from "react";
import { showToast } from "@/utils";
import * as SecureStore from "expo-secure-store";
import { config } from "@/config";
import { Text } from "react-native";

export const LeaveApprovalScreen = ({ navigation }: any) => {
  const [status, setStatus] = useState("All");
  const [isHr, setIsHr] = useState(false);

  const {
    leaveDetails,
    leaveLoading,
    leaveError,
    reviewLoading,
    reviewError,
    fetchLeaveApprovals,
  } = useLeaveApprovalStore();

  useEffect(() => {
    const checkRole = async () => {
      const role = await SecureStore.getItemAsync("role");
      if (role?.toUpperCase() !== "HR") {
        showToast("Access denied.", "error");
        navigation.goBack();
        return;
      }
      setIsHr(true);
    };
    checkRole();
  }, [navigation]);

  useEffect(() => {
    if (!isHr) return;
    const statusValue = status === "All" ? undefined : status.toUpperCase();
    fetchLeaveApprovals(statusValue);
  }, [status, isHr, fetchLeaveApprovals]);

  useEffect(() => {
    if (leaveError && leaveError.length > 0) {
      showToast(leaveError, "error");
    }
  }, [leaveError]);

  useEffect(() => {
    if (reviewError && reviewError.length > 0) {
      showToast(reviewError, "error");
    }
  }, [reviewError]);

  const _navigateToLeaveDetails = (leave: any) => {
    return navigation.navigate("LeaveApprovalDetails", {
      leave,
      status,
    });
  };
  const _navigateToNotification = () => {
    return navigation.navigate("Notification");
  };

  const _renderLeaves = () => {
    if (leaveLoading) {
      return <Loader />;
    }

    if (!leaveDetails || Object.keys(leaveDetails).length === 0) {
      return (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NoDataFound
            title={LEAVE_APPROVAL_CONFIG.noDataTitle}
            buttonTitle={LEAVE_APPROVAL_CONFIG.retry}
            onPress={() => {
              const statusValue =
                status === "All" ? undefined : status.toUpperCase();
              fetchLeaveApprovals(statusValue);
            }}
          />
        </ScrollView>
      );
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <LeaveDetails
          leaveDetails={leaveDetails}
          navigateToLeaveDetails={_navigateToLeaveDetails}
          onRefresh={() => {
            const statusValue =
              status === "All" ? undefined : status.toUpperCase();
            fetchLeaveApprovals(statusValue);
          }}
        />
      </ScrollView>
    );
  };

  return (
    <>
      <Header navigateToNotification={_navigateToNotification} />
      <PageContainer isLightStatusBar={true}>
        <Body status={status} onStatusChange={setStatus} />
        {_renderLeaves()}
      </PageContainer>

      {reviewLoading && <Loader useModalLoader />}
    </>
  );
};
