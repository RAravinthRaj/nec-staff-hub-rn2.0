/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

export const Images = {
  logo: require("./images/logo.png"),
  landing: require("./images/landing.png"),
  login: require("./images/login.png"),
  google: require("./images/google.png"),
  otp: require("./images/otp.png"),
  noData: require("./images/noclass.png"),
  totalStudents: require("./images/totalstudent.png"),
  present: require("./images/present.png"),
  absent: require("./images/absent.png"),
  onDuty: require("./images/onduty.png"),
  profile: require("./images/profile.png"),
};

export const ImagesCache = [
  Images.logo,
  Images.landing,
  Images.login,
  Images.google,
  Images.otp,
  Images.totalStudents,
  Images.present,
  Images.absent,
  Images.onDuty,
  Images.profile,
];

export const FontFamily = {
  "Inter-Regular": require("./fonts/Inter-Regular.ttf"),
  "Inter-SemiBold": require("./fonts/Inter-SemiBold.ttf"),
  "Inter-Bold": require("./fonts/Inter-Bold.ttf"),
};

export const Fonts = {
  regular: "Inter-Regular",
  semibold: "Inter-SemiBold",
  bold: "Inter-Bold",
};

export const Lotties = {
  loader: require("./lotties/loader.json"),
};

export const LottiesCache = [Lotties.loader];
