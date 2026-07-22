/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { NoDataFound, PageContainer } from "@/components";
import { Body, Header, LeaveDetails } from "./components";
import { ScrollView } from "react-native";
import { LEAVE_INTIMATION_CONFIG } from "./config";
import { useMemo, useState } from "react";
import { showToast } from "@/utils";

type ConfigLeaveGroups = typeof LEAVE_INTIMATION_CONFIG.leaveDetails;
type LeaveMonth = keyof ConfigLeaveGroups;
type LeaveItem = ConfigLeaveGroups[LeaveMonth][number];
type LeaveGroups = Record<string, LeaveItem[]>;

export const LeaveIntimationScreen = () => {
  const [status, setStatus] = useState("All");

  const leaveDetails = useMemo(() => {
    const localLeaves = LEAVE_INTIMATION_CONFIG.leaveDetails as LeaveGroups;

    if (status === "All") {
      return localLeaves;
    }

    return Object.entries(localLeaves).reduce(
      (acc, [month, leaves]) => {
        const filteredLeaves = leaves.filter(
          (leave) => leave.status.toLowerCase() === status.toLowerCase(),
        );

        if (filteredLeaves.length > 0) {
          acc[month] = filteredLeaves;
        }

        return acc;
      },
      {} as LeaveGroups,
    );
  }, [status]);

  const _navigateToLeaveDetails = (leave: any) => {
    showToast(`${leave?.facultyName || "Faculty"} - ${leave?.status}`, "info");
  };

  const _renderLeaves = () => {
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
            title={LEAVE_INTIMATION_CONFIG.noDataTitle}
            buttonTitle={LEAVE_INTIMATION_CONFIG.retry}
            onPress={() => {
              showToast("Showing local HOD leave request data.", "info");
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
      <Header />
      <PageContainer isLightStatusBar={true}>
        <Body status={status} onStatusChange={setStatus} />
        {_renderLeaves()}
      </PageContainer>
    </>
  );
};
