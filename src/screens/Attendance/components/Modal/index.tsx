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
import { ATTENDANCE_CONFIG } from "../../config";

export interface ICustomModal {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
}

export const CustomModal = ({
  visible,
  setVisible,
  onConfirm,
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
            {ATTENDANCE_CONFIG.saveTitle}
          </Text>
          <Text style={StyleSheet.flatten([S.modalSubTitle])}>
            {ATTENDANCE_CONFIG.saveSubtitle}
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
                {ATTENDANCE_CONFIG.cancel}
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
                {ATTENDANCE_CONFIG.confirm}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
