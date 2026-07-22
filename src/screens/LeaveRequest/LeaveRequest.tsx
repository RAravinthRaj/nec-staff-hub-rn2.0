/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { Loader, PageContainer } from "@/components";
import { Body, CustomModal, Header } from "./components";
import { LEAVE_REQUEST_CONFIG } from "./config";
import { useLeaveCategoriesStore, useLeaveRequestStore } from "./stores";
import { showToast } from "@/utils";
import { useEffect, useState } from "react";
import { useLeaveRequestsStore } from "../Leaves/stores";
import { DocumentItem } from "./components/Documents";
import * as FileSystem from "expo-file-system/legacy";
import { getDocumentMimeType, isAllowedDocumentType } from "@/utils/documents";

export const LeaveRequestScreen = ({ navigation }: any) => {
  const MAX_DOCUMENT_SIZE_BYTES = 20 * 1024 * 1024;

  const { requestLeave, requestLoading, requestError, resetRequestLeave } =
    useLeaveRequestStore();
  const {
    categories,
    categoriesLoading,
    categoriesError,
    fetchLeaveCategories,
  } = useLeaveCategoriesStore();
  const { fetchLeaveRequests } = useLeaveRequestsStore();

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState<string | undefined>();
  const [pendingPayload, setPendingPayload] = useState<{
    leaveType: "FULL_DAY" | "HALF_DAY";
    categoryId: number;
    startDate: string;
    endDate: string;
    reason: string;
    documents?: string[];
  } | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    if (requestError && requestError.length > 0) {
      showToast(requestError, "error");
      resetRequestLeave();
    }
  }, [requestError, resetRequestLeave]);

  useEffect(() => {
    fetchLeaveCategories();
  }, [fetchLeaveCategories]);

  useEffect(() => {
    if (categoriesError && categoriesError.length > 0) {
      showToast(categoriesError, "error");
    }
  }, [categoriesError]);

  const _goBack = () => {
    return navigation.goBack();
  };

  const _handleSubmit = async (payload: {
    leaveType: "FULL_DAY" | "HALF_DAY";
    categoryId: number;
    startDate: string;
    endDate: string;
    reason: string;
    documents?: DocumentItem[];
  }) => {
    try {
      setUploadLoading(true);
      const uploadedDocuments = await Promise.all(
        (payload.documents ?? []).map(async (document) => {
          if (!isAllowedDocumentType(document.name, document.mimeType)) {
            throw new Error("Only PDF, PNG, JPG, and JPEG files are allowed.");
          }

          if ((document.size ?? 0) > MAX_DOCUMENT_SIZE_BYTES) {
            throw new Error("Document size must not exceed 20 MB.");
          }

          const base64 = await FileSystem.readAsStringAsync(document.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          const mimeType =
            getDocumentMimeType(document.name, document.mimeType) ||
            "application/octet-stream";

          return `data:${mimeType};base64,${base64}`;
        }),
      );

      const res = await requestLeave(
        payload.leaveType,
        payload.categoryId,
        payload.startDate,
        payload.endDate,
        payload.reason,
        uploadedDocuments,
      );

      const data = res?.payload;
      if (data?.can_submit === false) {
        setConfirmMessage(
          data.warning || "Insufficient leave balance. Submit anyway?"
        );
        setPendingPayload({
          ...payload,
          documents: uploadedDocuments,
        });
        setConfirmVisible(true);
        return;
      }

      if (data?.warning) {
        showToast(data.warning, "info");
      }

      await fetchLeaveRequests();
      showToast("Leave request submitted successfully.", "success");
      navigation.goBack();
    } catch (err: any) {
      showToast(err?.message || "Failed to submit leave request.", "error");
    } finally {
      setUploadLoading(false);
    }
  };

  const _confirmSubmit = async () => {
    if (!pendingPayload) return;

    try {
      const res = await requestLeave(
        pendingPayload.leaveType,
        pendingPayload.categoryId,
        pendingPayload.startDate,
        pendingPayload.endDate,
        pendingPayload.reason,
        pendingPayload.documents,
        true,
      );

      const data = res?.payload;
      if (data?.warning) {
        showToast(data.warning, "info");
      }

      await fetchLeaveRequests();
      showToast("Leave request submitted successfully.", "success");
      navigation.goBack();
    } catch (err: any) {
      showToast(err?.message || "Failed to submit leave request.", "error");
    } finally {
      setPendingPayload(null);
      setConfirmMessage(undefined);
    }
  };

  const _renderLeaveRequest = () => {
    if (categoriesLoading) {
      return <Loader />;
    }

    return (
      <Body
        categories={
          categories.length > 0
            ? categories.map((c) => ({
                label: `${c.name} (${c.remaining_days})`,
                value: String(c.id),
              }))
            : LEAVE_REQUEST_CONFIG.categories
        }
        onSubmit={_handleSubmit}
        submitLoading={requestLoading}
      />
    );
  };

  return (
    <>
      <Header goBack={_goBack} />
      <PageContainer isLightStatusBar={true}>
        {_renderLeaveRequest()}
      </PageContainer>

      {(requestLoading || uploadLoading) && <Loader useModalLoader />}

      {confirmVisible && (
        <CustomModal
          visible={confirmVisible}
          setVisible={setConfirmVisible}
          onConfirm={_confirmSubmit}
          message={confirmMessage}
        />
      )}
    </>
  );
};
