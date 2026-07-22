/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import React from "react";
import Toast from "react-native-toast-message";
import { CustomToast } from "@/components/Toast";

export const toastConfig = {
  customToast: (props: any) => <CustomToast {...props} />,
};

export const showToast = (
  message: string,
  type: "success" | "error" | "info" = "success",
) => {
  Toast.show({
    type: "customToast",
    text1: message,
    position: "top",
    topOffset: 60,
    visibilityTime: 4000,
    props: { type },
  });
};
