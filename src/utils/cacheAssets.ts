/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Image } from "react-native";

export const cacheImages = (images: any[]) => {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

export const cacheFonts = (fonts: { [key: string]: any }) => {
  return Font.loadAsync(fonts);
};
