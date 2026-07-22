/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React from "react";
import { Modal, View, TouchableOpacity, StyleSheet, Text, TextInput } from "react-native";
import { styles as S } from "./styles";
import { useTheme } from "@rneui/themed";
import { LEAVE_APPROVAL_CONFIG } from "../../config";

export interface ICommentModal {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setValue: (value: string) => void;
  onSubmit: () => void;
}

export const CommentModal = ({
  visible,
  setVisible,
  value,
  setValue,
  onSubmit,
}: ICommentModal) => {
  const { theme } = useTheme();

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
            {LEAVE_APPROVAL_CONFIG.commentTitle}
          </Text>
          <Text style={StyleSheet.flatten([S.modalSubTitle])}>
            {LEAVE_APPROVAL_CONFIG.commentSubtitle}
          </Text>

          <TextInput
            style={StyleSheet.flatten([
              S.input,
              { borderColor: theme.colors.border, color: theme.colors.black },
            ])}
            placeholder={LEAVE_APPROVAL_CONFIG.commentPlaceholder}
            placeholderTextColor={theme.colors.border}
            value={value}
            onChangeText={setValue}
            multiline
          />

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
                {LEAVE_APPROVAL_CONFIG.cancel}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={StyleSheet.flatten([
                S.modalButton,
                { backgroundColor: theme.colors.badgeGreen },
              ])}
              onPress={onSubmit}
              activeOpacity={0.8}
            >
              <Text
                style={StyleSheet.flatten([
                  S.modalButtonText,
                  { color: theme.colors.white },
                ])}
              >
                {LEAVE_APPROVAL_CONFIG.commentSubmit}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
