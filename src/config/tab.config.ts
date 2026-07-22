/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import {
  HomeScreen,
  ProfileScreen,
  LeaveIntimationScreen,
} from "@/screens";

export const TAB_CONFIG = [
  {
    name: "Home",
    component: HomeScreen,
    icon: {
      focused: { name: "home", type: "entypo" },
      unfocused: { name: "home", type: "antdesign" },
    },
  },
  {
    name: "Hod",
    component: LeaveIntimationScreen,
    icon: {
      focused: { name: "clipboard", type: "entypo" },
      unfocused: { name: "clipboard", type: "feather" },
    },
  },
  {
    name: "Profile",
    component: ProfileScreen,
    icon: {
      focused: { name: "person", type: "ionicons" },
      unfocused: { name: "person-outline", type: "ionicons" },
    },
  },
];
