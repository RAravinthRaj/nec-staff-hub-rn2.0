/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import React from "react";
import { View, Text, Modal } from "react-native";
import LottieView from "lottie-react-native";
import { useThemeMode } from "@/hooks";
import { styles as S } from "./styles";

export interface ILoader {
  loadingText?: string;
  useModalLoader?: boolean;
}

export const Loader = ({
  loadingText = "Request in Progress.\nPlease Wait...",
  useModalLoader = false,
}: ILoader) => {
  const { theme } = useThemeMode();

  const content = (
    <View style={S.centerContainer}>
      <LottieView
        source={require("@/assets/lotties/loader.json")}
        autoPlay
        loop
        style={useModalLoader ? S.modalLottie : S.fullLottie}
      />
      <Text style={S.loadingText}>{loadingText}</Text>
    </View>
  );

  if (useModalLoader) {
    return (
      <Modal visible={true} transparent animationType="fade">
        <View style={S.modalOverlay}>
          <View
            style={[S.modalContainer, { backgroundColor: theme.colors.white }]}
          >
            <LottieView
              source={require("@/assets/lotties/loader.json")}
              autoPlay
              loop
              style={S.modalLottie}
            />
            <Text style={S.loadingText}>{loadingText}</Text>
          </View>
        </View>
      </Modal>
    );
  }

  return <View style={S.fullContainer}>{content}</View>;
};
