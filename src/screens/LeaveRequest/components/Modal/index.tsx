/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React from "react";
import { Modal, View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { styles as S } from "./styles";
import { useTheme } from "@rneui/themed";
import { LEAVE_REQUEST_CONFIG } from "../../config";

export interface ICustomModal {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  message?: string;
}

export const CustomModal = ({
  visible,
  setVisible,
  onConfirm,
  message,
}: ICustomModal) => {
  const { theme } = useTheme();

  const handleConfirm = () => {
    onConfirm();
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      <View style={StyleSheet.flatten([S.modal])}>
        <View
          style={StyleSheet.flatten([
            S.modalContainer,
            { backgroundColor: theme.colors.white },
          ])}
        >
          <Text style={StyleSheet.flatten([S.modalTitle])}>
            {LEAVE_REQUEST_CONFIG.confirmTitle}
          </Text>
          <Text style={StyleSheet.flatten([S.modalSubTitle])}>
            {message || LEAVE_REQUEST_CONFIG.confirmSubtitle}
          </Text>

          <View style={StyleSheet.flatten([S.modalButtonContainer])}>
            <TouchableOpacity
              style={StyleSheet.flatten([
                S.modalButton,
                { backgroundColor: theme.colors.red },
              ])}
              onPress={() => setVisible(false)}
              activeOpacity={0.8}
            >
              <Text
                style={StyleSheet.flatten([
                  S.modalButtonText,
                  { color: theme.colors.white },
                ])}
              >
                {LEAVE_REQUEST_CONFIG.cancel}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={StyleSheet.flatten([
                S.modalButton,
                { backgroundColor: theme.colors.badgeGreen },
              ])}
              onPress={handleConfirm}
              activeOpacity={0.8}
            >
              <Text
                style={StyleSheet.flatten([
                  S.modalButtonText,
                  { color: theme.colors.white },
                ])}
              >
                {LEAVE_REQUEST_CONFIG.confirmYes}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
