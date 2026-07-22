/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Images, Fonts } from "@/assets";
import { styles as S } from "./styles";
import { LOGIN_CONFIG } from "../../config";
import { useTheme } from "@rneui/themed";
import ElevatedView from "react-native-elevated-view";

export interface IBody {
  navigateToOtp: () => void;
  handleGoogleLogin: () => void;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export const Body = ({ navigateToOtp, handleGoogleLogin, setEmail }: IBody) => {
  const { theme } = useTheme();

  const _renderImage = () => (
    <View style={S.imageContainer}>
      <Image source={Images.login} style={S.loginImage} />
    </View>
  );

  const _renderHeaderText = () => (
    <View>
      <View style={S.textContainer}>
        <Text style={[S.header, { fontFamily: Fonts.bold }]}>
          {LOGIN_CONFIG.greet}
        </Text>
        <Text
          style={[
            S.header,
            { color: theme.colors.primary, fontFamily: Fonts.bold },
          ]}
        >
          {LOGIN_CONFIG.appName}
        </Text>
      </View>

      <View style={S.descriptionContainer}>
        <Text style={[S.description, { fontFamily: Fonts.regular }]}>
          {LOGIN_CONFIG.description}
        </Text>
      </View>
    </View>
  );

  const _renderForm = () => (
    <View style={S.formContainer}>
      <View
        style={[S.labelContainer, { backgroundColor: theme.colors.background }]}
      >
        <Text
          style={[
            S.labelText,
            { fontFamily: Fonts.regular, color: theme.colors.black },
          ]}
        >
          {LOGIN_CONFIG.label}
        </Text>
      </View>

      <TextInput
        style={[
          S.input,
          {
            borderColor: theme.colors.background,
            borderWidth: 1,
            backgroundColor: theme.colors.secondaryBackground,
            color: theme.colors.black,
          },
        ]}
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="send"
        onChangeText={setEmail}
        onSubmitEditing={navigateToOtp}
      />

      {_renderLoginButton()}

      <Text
        style={[
          S.separator,
          {
            color: theme.colors.black,
            fontFamily: Fonts.bold,
          },
        ]}
      >
        {LOGIN_CONFIG.or}
      </Text>
    </View>
  );

  const _renderLoginButton = () => (
    <ElevatedView style={S.buttonContainer} elevation={2}>
      <TouchableOpacity
        style={[S.button, { backgroundColor: theme.colors.primary }]}
        activeOpacity={0.8}
        onPress={navigateToOtp}
      >
        <Text
          style={[
            S.buttonTitle,
            { color: theme.colors.white, fontFamily: Fonts.semibold },
          ]}
        >
          {LOGIN_CONFIG.buttonTitle}
        </Text>
      </TouchableOpacity>
    </ElevatedView>
  );

  const _renderGoogleLoginButton = () => (
    <ElevatedView style={S.buttonContainer} elevation={2}>
      <TouchableOpacity
        style={[
          S.button,
          {
            backgroundColor: theme.colors.secondaryBackground,
            borderWidth: 0.2,
          },
        ]}
        activeOpacity={0.8}
        onPress={handleGoogleLogin}
      >
        <Image source={Images.google} style={S.googleImage} />
        <Text
          style={[
            S.buttonTitle,
            {
              color: theme.colors.black,
              fontFamily: Fonts.semibold,
            },
          ]}
        >
          {LOGIN_CONFIG.googleButtonTitle}
        </Text>
      </TouchableOpacity>
    </ElevatedView>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        style={S.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {_renderImage()}
        {_renderHeaderText()}
        {_renderForm()}
        {_renderGoogleLoginButton()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
