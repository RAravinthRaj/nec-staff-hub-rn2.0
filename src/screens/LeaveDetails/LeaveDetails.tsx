/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { Loader, PageContainer } from "@/components";
import { Body, Header } from "./components";
import { CustomModal } from "./components/Modal";
import { showToast } from "@/utils";
import {
  useCancelLeaveRequestStore,
  useLeaveRequestsStore,
} from "../Leaves/stores";
import { useState } from "react";

export const LeaveDetailScreen = ({ navigation, route }: any) => {
  const { leave, fromHod } = route.params;
  const { cancelLeaveRequest, cancelLoading } = useCancelLeaveRequestStore();
  const { fetchLeaveRequests } = useLeaveRequestsStore();
  const [confirmVisible, setConfirmVisible] = useState(false);

  const _goBack = () => {
    return navigation.goBack();
  };

  const _openCancelConfirm = () => {
    setConfirmVisible(true);
  };

  const _handleCancel = async () => {
    try {
      if (!leave?.id) {
        showToast("Invalid leave request.", "error");
        return;
      }

      await cancelLeaveRequest(Number(leave?.id));
      await fetchLeaveRequests();
      showToast("Leave cancelled successfully", "success");
      navigation.goBack();
    } catch (err: any) {
      showToast(err?.message || "Failed to cancel leave request.", "error");
    }
  };

  return (
    <>
      <Header goBack={_goBack} />
      <PageContainer isLightStatusBar={true}>
        <Body leave={leave} fromHod={fromHod} onCancel={_openCancelConfirm} />
      </PageContainer>

      {cancelLoading && <Loader useModalLoader />}

      {confirmVisible && (
        <CustomModal
          visible={confirmVisible}
          setVisible={setConfirmVisible}
          onConfirm={_handleCancel}
        />
      )}
    </>
  );
};
