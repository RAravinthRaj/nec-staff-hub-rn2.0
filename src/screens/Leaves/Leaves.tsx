/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { Loader, NoDataFound, PageContainer } from "@/components";
import { Body, Header, LeaveDetails } from "./components";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { showToast } from "@/utils";
import { useLeaveRequestsStore } from "./stores";
import { LEAVE_CONFIG } from "./config";

export const LeaveScreen = ({ navigation }: any) => {
  const [status, setStatus] = useState("All");

  const {
    leaveDetails,
    leaveRequestsLoading,
    leaveRequestsError,
    fetchLeaveRequests,
  } = useLeaveRequestsStore();

  useEffect(() => {
    const statusValue = status === "All" ? undefined : status.toUpperCase();
    fetchLeaveRequests(statusValue);
  }, [status, fetchLeaveRequests]);

  useEffect(() => {
    if (leaveRequestsError && leaveRequestsError.length > 0) {
      showToast(leaveRequestsError, "error");
    }
  }, [leaveRequestsError]);

  const _navigateToNewLeave = () => {
    return navigation.navigate("LeaveRequest");
  };

  const _navigateToLeaveDetails = (leave: any) => {
    return navigation.navigate("LeaveDetails", {
      leave,
      fromHod: false,
    });
  };

  const _renderLeaves = () => {
    if (leaveRequestsLoading) {
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
            title={LEAVE_CONFIG.noDataTitle}
            buttonTitle={LEAVE_CONFIG.retry}
            onPress={() => {
              const statusValue = status === "All" ? undefined : status.toUpperCase();
              fetchLeaveRequests(statusValue);
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
        />
      </ScrollView>
    );
  };

  return (
    <>
      <Header navigateToNewLeave={_navigateToNewLeave} />
      <PageContainer isLightStatusBar={true}>
        <Body status={status} onStatusChange={setStatus} />
        {_renderLeaves()}
      </PageContainer>
    </>
  );
};
