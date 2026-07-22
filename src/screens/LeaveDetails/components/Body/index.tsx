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
import { LEAVE_DETAIL_CONFIG } from "../../config";
import ElevatedView from "react-native-elevated-view";
import { Fonts } from "@/assets";
import { DocumentViewerModal, getDocumentFileName } from "@/components";

export interface Leave {
  id?: number;
  status: "Pending" | "Approved" | "Rejected";
  startDate: string;
  endDate: string;
  applicationDate: string;
  category: string;
  type: string;
  numberOfDays: number;
  reason?: string;
  comments?: string;
  documents?: string[];
  facultyName?: string;
}

export interface IBody {
  leave: Leave;
  fromHod: boolean;
  onCancel?: () => void;
}

export const Body = ({ leave, fromHod, onCancel }: IBody) => {
  const { theme } = useTheme();
  const colors: any = theme.colors;
  const [documentModalVisible, setDocumentModalVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{
    url: string;
    fileName: string;
  } | null>(null);

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

  const _calculateDays = (start: string, end: string) => {
    const [sd, sm, sy] = start.split(".").map(Number);
    const [ed, em, ey] = end.split(".").map(Number);

    if (!sd || !sm || !sy || !ed || !em || !ey) return undefined;

    const startDate = new Date(sy, sm - 1, sd);
    const endDate = new Date(ey, em - 1, ed);
    const msPerDay = 24 * 60 * 60 * 1000;
    const diff = Math.floor((endDate.getTime() - startDate.getTime()) / msPerDay) + 1;

    return diff > 0 ? diff : undefined;
  };

  const _isHalfDay = () => {
    const type = (leave.type || "").toLowerCase();
    return type.includes("half");
  };

  const numberOfDays = _isHalfDay()
    ? undefined
    : _calculateDays(leave.startDate, leave.endDate);

  const _renderHRStatus = (status: string) => {
    let title = "";
    if (status === LEAVE_DETAIL_CONFIG.approved) {
      title = status + " " + LEAVE_DETAIL_CONFIG.by;
      return _renderKeyValue(title, LEAVE_DETAIL_CONFIG.hrAdmin);
    }

    if (status === LEAVE_DETAIL_CONFIG.declined) {
      title = status + " " + LEAVE_DETAIL_CONFIG.by;
      return _renderKeyValue(title, LEAVE_DETAIL_CONFIG.hrAdmin);
    }
  };

  const _renderStatus = () => {
    const status = leave.status;
    const normalizedStatus =
      status.toLowerCase() as keyof typeof LEAVE_DETAIL_CONFIG.color;
    const colorKey = LEAVE_DETAIL_CONFIG.color[normalizedStatus] ?? "gray";
    const backgroundKey = `${colorKey}Background`;

    return (
      <View style={StyleSheet.flatten([S.dataContainer])}>
        <Text
          style={StyleSheet.flatten([
            S.keyText,
            { color: colors.black, opacity: 0.5 },
          ])}
        >
          {LEAVE_DETAIL_CONFIG.status}
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

  const _renderButton = () => {
    if (leave.status !== LEAVE_DETAIL_CONFIG.pending || fromHod) return null;

    return (
      <ElevatedView
        style={StyleSheet.flatten([S.buttonContainer])}
        elevation={5}
      >
        <TouchableOpacity
          style={StyleSheet.flatten([
            S.button,
            { backgroundColor: colors.red },
          ])}
          activeOpacity={0.8}
          onPress={onCancel}
        >
          <Text
            style={StyleSheet.flatten([
              S.buttonTitle,
              { color: theme.colors.white, fontFamily: Fonts.semibold },
            ])}
          >
            {LEAVE_DETAIL_CONFIG.buttonTitle}
          </Text>
        </TouchableOpacity>
      </ElevatedView>
    );
  };

  const _renderDocuments = () => {
    if (!leave.documents?.length) {
      return (
        <Text style={StyleSheet.flatten([S.valueText])}>
          {LEAVE_DETAIL_CONFIG.noDocumentsFound}
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
              { label: LEAVE_DETAIL_CONFIG.startDate, value: leave.startDate },
              { label: LEAVE_DETAIL_CONFIG.category, value: leave.category },
              {
                label: LEAVE_DETAIL_CONFIG.numberOfDays,
                value: numberOfDays,
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
                label: LEAVE_DETAIL_CONFIG.applicationDate,
                value: leave.applicationDate,
              },
              { label: LEAVE_DETAIL_CONFIG.endDate, value: leave.endDate },
              { label: LEAVE_DETAIL_CONFIG.type, value: leave.type },
            ])}

            {fromHod && _renderKeyValue("Applied By", leave?.facultyName)}
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
              { label: LEAVE_DETAIL_CONFIG.reason, value: leave.reason },
              ...(leave.status === LEAVE_DETAIL_CONFIG.approved ||
              leave.status === LEAVE_DETAIL_CONFIG.declined
                ? [
                    {
                      label: LEAVE_DETAIL_CONFIG.comments,
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
                {LEAVE_DETAIL_CONFIG.documents}
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

  return (
    <>
      <ScrollView
        style={StyleSheet.flatten([
          S.container,
          { backgroundColor: theme.colors.white },
        ])}
        showsVerticalScrollIndicator={false}
      >
        {_renderData()}
        {_renderButton()}
      </ScrollView>

      <DocumentViewerModal
        visible={documentModalVisible}
        documentUrl={selectedDocument?.url}
        fileName={selectedDocument?.fileName}
        onClose={closeDocumentModal}
      />
    </>
  );
};
