/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@rneui/themed";
import { styles as S } from "./styles";
import { LEAVE_APPROVAL_DETAIL_CONFIG } from "../../config";
import ElevatedView from "react-native-elevated-view";
import { Fonts } from "@/assets";
import { CustomModal } from "../Modal";
import { CommentModal } from "../../../LeaveApproval/components/CommentModal";
import { useLeaveApprovalStore } from "../../../LeaveApproval/stores";
import { showToast } from "@/utils";
import { DocumentViewerModal, getDocumentFileName } from "@/components";

export interface IBody {
  leave: any;
  onReviewed: () => void;
}

type ActionType = "Approved" | "Declined" | null;

export const Body = ({ leave, onReviewed }: IBody) => {
  const { theme } = useTheme();
  const colors: any = theme.colors;
  const [visible, setVisible] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [actionType, setActionType] = useState<ActionType>(null);
  const [documentModalVisible, setDocumentModalVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{
    url: string;
    fileName: string;
  } | null>(null);
  const { reviewLeaveRequest } = useLeaveApprovalStore();

  const openConfirmation = (leave: any, action: ActionType) => {
    setSelectedLeave(leave);
    setActionType(action);
    setVisible(true);
  };

  const openCommentModal = () => {
    setVisible(false);
    setCommentVisible(true);
  };

  const openDocumentModal = (documentUrl: string, fileName: string) => {
    setSelectedDocument({
      url: documentUrl,
      fileName,
    });
    setDocumentModalVisible(true);
  };

  const closeDocumentModal = () => {
    setDocumentModalVisible(false);
    setSelectedDocument(null);
  };

  const _renderHRStatus = (status: string) => {
    let title = "";
    if (status === LEAVE_APPROVAL_DETAIL_CONFIG.approved) {
      title = status + " " + LEAVE_APPROVAL_DETAIL_CONFIG.by;
      return _renderKeyValue(title, LEAVE_APPROVAL_DETAIL_CONFIG.hrAdmin);
    }

    if (status === LEAVE_APPROVAL_DETAIL_CONFIG.declined) {
      title = status + " " + LEAVE_APPROVAL_DETAIL_CONFIG.by;
      return _renderKeyValue(title, LEAVE_APPROVAL_DETAIL_CONFIG.hrAdmin);
    }
  };

  const _renderStatus = () => {
    const status = String(leave?.status || "");
    const normalizedStatus =
      status.toLowerCase() as keyof typeof LEAVE_APPROVAL_DETAIL_CONFIG.color;
    const colorKey =
      LEAVE_APPROVAL_DETAIL_CONFIG.color[normalizedStatus] ?? "gray";
    const backgroundKey = `${colorKey}Background`;

    if (!status) {
      return null;
    }

    return (
      <View style={StyleSheet.flatten([S.dataContainer])}>
        <Text
          style={StyleSheet.flatten([
            S.keyText,
            { color: colors.black, opacity: 0.5 },
          ])}
        >
          {LEAVE_APPROVAL_DETAIL_CONFIG.status}
        </Text>

        <ElevatedView
          style={StyleSheet.flatten([
            S.statusContainer,
            { backgroundColor: colors[backgroundKey] },
          ])}
        >
          <Text
            style={StyleSheet.flatten([
              S.statusText,
              {
                color: colors[colorKey],
                fontFamily: Fonts.regular,
              },
            ])}
          >
            {status}
          </Text>
        </ElevatedView>
      </View>
    );
  };

  const _renderButton = (title: ActionType, color: string) => {
    if (leave.status !== LEAVE_APPROVAL_DETAIL_CONFIG.pending) return null;
    if (!title) return null;

    return (
      <ElevatedView
        style={StyleSheet.flatten([S.buttonContainer])}
        elevation={5}
      >
        <TouchableOpacity
          style={StyleSheet.flatten([S.button, { backgroundColor: color }])}
          activeOpacity={0.8}
          onPress={() => openConfirmation(leave, title)}
        >
          <Text
            style={StyleSheet.flatten([
              S.buttonTitle,
              { color: theme.colors.white, fontFamily: Fonts.semibold },
            ])}
          >
            {title.substring(0, title.length - 1)}
          </Text>
        </TouchableOpacity>
      </ElevatedView>
    );
  };

  const _renderDocuments = () => {
    if (!leave.documents?.length) {
      return (
        <Text style={StyleSheet.flatten([S.valueText])}>
          {LEAVE_APPROVAL_DETAIL_CONFIG.noDocumentsFound}
        </Text>
      );
    }

    return leave.documents.map((documentUrl: string, index: number) => {
      const fileName = getDocumentFileName(documentUrl, index);

      return (
        <TouchableOpacity
          key={`${documentUrl}-${index}`}
          activeOpacity={0.8}
          onPress={() => openDocumentModal(documentUrl, fileName)}
        >
          <Text
            style={StyleSheet.flatten([
              S.valueText,
              { color: theme.colors.primary, textDecorationLine: "underline" },
            ])}
          >
            {fileName}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  const _renderDocumentModal = () => {
    return (
      <DocumentViewerModal
        visible={documentModalVisible}
        documentUrl={selectedDocument?.url}
        fileName={selectedDocument?.fileName}
        onClose={closeDocumentModal}
      />
    );
  };

  const _renderKeyValue = (label: string, value?: string | number) => (
    <View style={StyleSheet.flatten([S.dataContainer])}>
      <Text
        style={StyleSheet.flatten([
          S.keyText,
          { color: theme.colors.black, opacity: 0.5 },
        ])}
      >
        {label}
      </Text>
      <Text style={StyleSheet.flatten([S.valueText])}>{value ?? "-"}</Text>
    </View>
  );

  const _renderRow = (items: { label: string; value?: string | number }[]) => (
    <View
      style={StyleSheet.flatten([
        S.rowContainer,
        { backgroundColor: theme.colors.white },
      ])}
    >
      {items.map((item) => (
        <View key={item.label}>{_renderKeyValue(item.label, item.value)}</View>
      ))}
    </View>
  );

  const _renderData = () => {
    return (
      <View>
        <View
          style={StyleSheet.flatten([
            S.headerContainer,
            { backgroundColor: theme.colors.white },
          ])}
        >
          <View
            style={StyleSheet.flatten([
              S.rowContainer,
              { backgroundColor: theme.colors.white },
            ])}
          >
            {_renderStatus()}
            {_renderRow([
              {
                label: LEAVE_APPROVAL_DETAIL_CONFIG.startDate,
                value: leave.startDate,
              },
              {
                label: LEAVE_APPROVAL_DETAIL_CONFIG.category,
                value: leave.category,
              },
              {
                label: LEAVE_APPROVAL_DETAIL_CONFIG.numberOfDays,
                value: leave.numberOfDays,
              },
            ])}

            {_renderHRStatus(leave?.status)}
          </View>

          <View
            style={StyleSheet.flatten([
              S.rowContainer,
              { backgroundColor: theme.colors.white },
            ])}
          >
            {_renderRow([
              {
                label: LEAVE_APPROVAL_DETAIL_CONFIG.applicationDate,
                value: leave.applicationDate,
              },
              {
                label: LEAVE_APPROVAL_DETAIL_CONFIG.endDate,
                value: leave.endDate,
              },
              { label: LEAVE_APPROVAL_DETAIL_CONFIG.type, value: leave.type },
            ])}

            {_renderKeyValue("Applied By", leave?.facultyName)}
          </View>
        </View>

        <View
          style={StyleSheet.flatten([
            S.headerContainer,
            { backgroundColor: theme.colors.white },
          ])}
        >
          <View
            style={StyleSheet.flatten([
              S.rowContainer,
              { backgroundColor: theme.colors.white },
            ])}
          >
            {_renderRow([
              {
                label: LEAVE_APPROVAL_DETAIL_CONFIG.reason,
                value: leave.reason,
              },
              ...(leave.status === LEAVE_APPROVAL_DETAIL_CONFIG.approved ||
              leave.status === LEAVE_APPROVAL_DETAIL_CONFIG.declined
                ? [
                    {
                      label: LEAVE_APPROVAL_DETAIL_CONFIG.comments,
                      value: leave.comments,
                    },
                  ]
                : []),
            ])}

            <View style={StyleSheet.flatten([S.dataContainer])}>
              <Text
                style={StyleSheet.flatten([
                  S.keyText,
                  { color: theme.colors.black, opacity: 0.5 },
                ])}
              >
                {LEAVE_APPROVAL_DETAIL_CONFIG.documents}
              </Text>

              <View style={StyleSheet.flatten([S.documentContainer])}>
                {_renderDocuments()}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const _renderApproval = () => {
    return (
      <View style={StyleSheet.flatten([S.approvalContainer])}>
        {_renderButton(
          LEAVE_APPROVAL_DETAIL_CONFIG.approved as ActionType,
          colors.badgeGreen,
        )}
        {_renderButton(LEAVE_APPROVAL_DETAIL_CONFIG.declined as ActionType, colors.red)}
      </View>
    );
  };

  return (
    <ScrollView
      style={StyleSheet.flatten([
        S.container,
        { backgroundColor: theme.colors.white },
      ])}
      showsVerticalScrollIndicator={false}
    >
      {_renderData()}
      {_renderApproval()}
      {visible && (
        <CustomModal
          visible={visible}
          setVisible={setVisible}
          action={actionType}
          onConfirm={openCommentModal}
        />
      )}
      {commentVisible && (
        <CommentModal
          visible={commentVisible}
          setVisible={setCommentVisible}
          value={comment}
          setValue={setComment}
          onSubmit={async () => {
            const trimmed = comment.trim();
            if (!trimmed) {
              showToast("Please enter comments.", "error");
              return;
            }

            if (!selectedLeave || !actionType) {
              showToast("Invalid leave request.", "error");
              return;
            }

            const status =
              actionType === LEAVE_APPROVAL_DETAIL_CONFIG.approved
                ? "APPROVED"
                : "DECLINED";

            try {
              await reviewLeaveRequest(selectedLeave.id, status, trimmed);
              showToast(
                `Leave ${actionType.toLowerCase()} successfully.`,
                "success",
              );
              setComment("");
              setSelectedLeave(null);
              setActionType(null);
              setCommentVisible(false);
              onReviewed();
            } catch (err: any) {
              showToast(
                err?.message || "Failed to review leave request.",
                "error",
              );
            }
          }}
        />
      )}
      {_renderDocumentModal()}
    </ScrollView>
  );
};
