/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import {
  HomeScreen,
  ProfileScreen,
  OAHomeScreen,
} from "@/screens";

export const STAFF_TAB_CONFIG = [
  {
    name: "Home",
    component: HomeScreen,
    icon: {
      focused: { name: "home", type: "entypo" },
      unfocused: { name: "home", type: "antdesign" },
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

export const HOD_TAB_CONFIG = [
  {
    name: "Home",
    component: HomeScreen,
    icon: {
      focused: { name: "home", type: "entypo" },
      unfocused: { name: "home", type: "antdesign" },
    },
  },
  {
    name: "Admin",
    component: OAHomeScreen,
    icon: {
      focused: { name: "dashboard", type: "material" },
      unfocused: { name: "dashboard", type: "material" },
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
