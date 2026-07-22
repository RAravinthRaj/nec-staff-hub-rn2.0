/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Icon, useTheme } from "@rneui/themed";
import { styles as S } from "./styles";
import { LEAVE_APPROVAL_CONFIG } from "../../config";
import ElevatedView from "react-native-elevated-view";
import { Fonts, Images } from "@/assets";
import { CustomModal } from "../Modal";
import { CommentModal } from "../CommentModal";
import { useLeaveApprovalStore } from "../../stores";
import { showToast } from "@/utils";

export interface ILeaveDetails {
  leaveDetails: any;
  navigateToLeaveDetails: (leave: any) => void;
  onRefresh: () => void;
}

type ActionType = "Approved" | "Declined" | null;

export const LeaveDetails = ({
  leaveDetails,
  navigateToLeaveDetails,
  onRefresh,
}: ILeaveDetails) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [actionType, setActionType] = useState<ActionType>(null);
  const { reviewLeaveRequest } = useLeaveApprovalStore();

  const formatDate = (dateStr: string): string => {
    const [day, month, year] = dateStr.split(".").map(Number);
    const date = new Date(year, month - 1, day);

    return `${LEAVE_APPROVAL_CONFIG.days[date.getDay()]}, ${date.getDate()} ${
      LEAVE_APPROVAL_CONFIG.months[date.getMonth()]
    }`;
  };

  const openConfirmation = (leave: any, action: ActionType) => {
    setSelectedLeave(leave);
    setActionType(action);
    setVisible(true);
  };

  const openCommentModal = () => {
    setVisible(false);
    setCommentVisible(true);
  };

  const _renderDate = (startDate: any, endDate: any) => {
    if (startDate === endDate) {
      return formatDate(startDate);
    }

    return formatDate(startDate) + " - " + formatDate(endDate);
  };

  const _renderButton = (leave: any) => {
    return (
      <TouchableOpacity
        style={StyleSheet.flatten([
          S.button,
          {
            backgroundColor: theme.colors.background,
          },
        ])}
        activeOpacity={0.8}
        onPress={() => {
          navigateToLeaveDetails(leave);
        }}
      >
        <Icon type="feather" name="chevron-right" size={20} color="black" />
      </TouchableOpacity>
    );
  };

  const _renderApprovalButton = (
    icon: any,
    type: any,
    leave: any,
    color: string,
    actionType: string
  ) => {
    return (
      <TouchableOpacity
        style={StyleSheet.flatten([
          S.approvalButton,
          { backgroundColor: color },
        ])}
        activeOpacity={0.8}
        onPress={() => openConfirmation(leave, actionType)}
      >
        <Icon name={icon} type={type} color={theme.colors.white} size={20} />
      </TouchableOpacity>
    );
  };

  const _renderStatus = (status: string, leave: any) => {
    const textColor = LEAVE_APPROVAL_CONFIG.color[status.toLowerCase()];
    const background = textColor + "Background";

    if (status === LEAVE_APPROVAL_CONFIG.pending) {
      return (
        <View style={StyleSheet.flatten([S.approvalButtonContainer])}>
          {_renderApprovalButton(
            "close",
            "ant-design",
            leave,
            theme.colors.red,
            LEAVE_APPROVAL_CONFIG.declined
          )}
          {_renderApprovalButton(
            "check",
            "font-awesome6",
            leave,
            theme.colors.badgeGreen,
            LEAVE_APPROVAL_CONFIG.approved
          )}
        </View>
      );
    }

    return (
      <ElevatedView
        style={StyleSheet.flatten([
          S.statusContainer,
          {
            backgroundColor: theme.colors[background],
          },
        ])}
      >
        <Text
          style={StyleSheet.flatten([
            S.statusText,
            {
              color: theme.colors[textColor],
              fontFamily: Fonts.regular,
            },
          ])}
        >
          {status}
        </Text>
      </ElevatedView>
    );
  };

  const _renderUserData = (leave: any) => {
    const dept =
      leave?.departmentAbbreviation && leave?.departmentAbbreviation.length > 0
        ? `Dept of ${leave?.departmentAbbreviation}`
        : leave?.departmentName;

    const genderLower = (leave?.gender || "").toLowerCase();
    const prefix =
      genderLower === "male"
        ? "Mr. "
        : genderLower === "female"
          ? "Ms. "
          : "";

    const details = [leave?.designation, dept]
      .filter((v) => v && v.length > 0)
      .join(", ");

    return (
      <View
        style={StyleSheet.flatten([
          S.userDataLeaveContainer,
          {
            padding: 10,
            backgroundColor: theme.colors.tertiaryBackground,
            borderTopColor: theme.colors.border,
            borderTopWidth: 1,
          },
        ])}
      >
        <View
          style={StyleSheet.flatten([
            S.userSubDataLeaveContainer,
            {
              marginLeft: 30,
              gap: 20,
            },
          ])}
        >
          <View style={S.byTextContainer}>
            <Text
              style={StyleSheet.flatten([
                S.byText,
                { color: theme.colors.primary },
              ])}
            >
              {LEAVE_APPROVAL_CONFIG.by}
            </Text>
          </View>
          <View style={S.dataDescription}>
            <Text style={S.byText}>
              {`${prefix}${leave?.facultyName || ""}`.trim()}
            </Text>
            <Text style={S.descriptionText}>
              {details || leave?.designation}
            </Text>
          </View>
        </View>

        {_renderButton(leave)}
      </View>
    );
  };

  const _renderSingleData = (leave: any, index: number) => {
    const status = leave?.status;

    if (!status) return null;

    return (
      <TouchableOpacity
        key={index}
        style={StyleSheet.flatten([
          S.leaveContainer,
          {
            backgroundColor: theme.colors.white,
            borderColor:
              status !== LEAVE_APPROVAL_CONFIG.pending
                ? theme.colors[
                    LEAVE_APPROVAL_CONFIG.color[status.toLowerCase()]
                  ]
                : theme.colors.border,
            borderLeftWidth: status !== LEAVE_APPROVAL_CONFIG.pending ? 8 : 1,
          },
        ])}
        onPress={() => {
          navigateToLeaveDetails(leave);
        }}
        activeOpacity={1}
      >
        <View style={StyleSheet.flatten([S.subLeaveContainer])}>
          <View style={StyleSheet.flatten([S.subLeaveContainer])}>
            <View>
              <Image
                source={Images.profile}
                style={StyleSheet.flatten([S.image])}
              />
            </View>
            <View style={StyleSheet.flatten([S.descriptionContainer])}>
              <View style={StyleSheet.flatten([S.description])}>
                <Text
                  style={StyleSheet.flatten([
                    S.typeText,
                    { color: theme.colors.black, opacity: 0.4 },
                  ])}
                >
                  {leave?.type}
                </Text>

                <Text
                  style={StyleSheet.flatten([
                    S.dateText,
                    { color: theme.colors.black, opacity: 0.7 },
                  ])}
                >
                  {_renderDate(leave?.startDate, leave?.endDate)}
                </Text>
              </View>

              <Text
                style={StyleSheet.flatten([
                  S.categoryText,
                  { color: theme.colors.primary, opacity: 0.7 },
                ])}
              >
                {leave?.category}
              </Text>
            </View>
          </View>

          <View style={StyleSheet.flatten([S.mainStatusContainer])}>
            {_renderStatus(status, leave)}
          </View>
        </View>

        <View style={StyleSheet.flatten([S.userDataLeaveContainer])}>
          {_renderUserData(leave)}
        </View>
      </TouchableOpacity>
    );
  };

  const _renderData = () => {
    return (
      <View style={StyleSheet.flatten([S.headerContainer])}>
        {Object.entries(leaveDetails).map(([month, leaves]: any, mIndex) => (
          <View key={mIndex} style={StyleSheet.flatten([S.mainLeaveContainer])}>
            <Text
              style={StyleSheet.flatten([
                S.monthText,
                {
                  color: theme.colors.black,
                  opacity: 0.5,
                },
              ])}
            >
              {month}
            </Text>

            {leaves.map((leave: any, index: number) => (
              <View key={index}>{_renderSingleData(leave, index)}</View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View
      style={StyleSheet.flatten([
        S.container,
        { backgroundColor: theme.colors.white },
      ])}
    >
      {_renderData()}
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
              actionType === LEAVE_APPROVAL_CONFIG.approved
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
              onRefresh();
            } catch (err: any) {
              showToast(
                err?.message || "Failed to review leave request.",
                "error",
              );
            }
          }}
        />
      )}
    </View>
  );
};
