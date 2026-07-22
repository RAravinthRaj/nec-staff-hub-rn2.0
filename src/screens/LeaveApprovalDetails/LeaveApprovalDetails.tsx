/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { Loader, PageContainer } from "@/components";
import { Body, Header } from "./components";
import { useLeaveApprovalStore } from "../LeaveApproval/stores";
import { showToast } from "@/utils";
import { useEffect } from "react";

export const LeaveApprovalDetailScreen = ({ navigation, route }: any) => {
  const { leave, status } = route.params;
  const { reviewLoading, reviewError, fetchLeaveApprovals } =
    useLeaveApprovalStore();

  const _goBack = () => {
    return navigation.goBack();
  };

  useEffect(() => {
    if (reviewError && reviewError.length > 0) {
      showToast(reviewError, "error");
    }
  }, [reviewError]);

  return (
    <>
      <Header goBack={_goBack} />
      <PageContainer isLightStatusBar={true}>
        <Body
          leave={leave}
          onReviewed={async () => {
            const statusValue =
              status === "All" ? undefined : String(status).toUpperCase();
            await fetchLeaveApprovals(statusValue);
            navigation.goBack();
          }}
        />
      </PageContainer>

      {reviewLoading && <Loader useModalLoader />}
    </>
  );
};
