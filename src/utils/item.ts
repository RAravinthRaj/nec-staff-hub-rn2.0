/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import * as SecureStore from "expo-secure-store";

export const getGraphqlError = (err: any): string => {
  let msg = "";

  if (err?.graphQLErrors?.length > 0) {
    msg = err.graphQLErrors[0].message;
  } else if (err?.networkError) {
    const networkErr: any = err.networkError;
    if (networkErr.result?.errors?.length > 0) {
      msg = networkErr.result.errors[0].message;
    } else if (networkErr.bodyText) {
      try {
        const parsed = JSON.parse(networkErr.bodyText);
        if (parsed.errors?.length > 0) {
          msg = parsed.errors[0].message;
        }
      } catch (_) {
        msg = networkErr.message;
      }
    } else {
      msg = networkErr.message;
    }
  } else if (err?.message) {
    msg = err.message;
  }

  return msg;
};

export const getItemInLocalStorage = async (key: string) => {
  try {
    const item = await SecureStore.getItemAsync(key);
    if (!item) return undefined;
    if (key === "token" || key === "signInToken") {
      return item;
    }

    return JSON.parse(item);
  } catch (err) {
    console.error(
      `Error getting or parsing item from localStorage with key "${key}":`,
      err,
    );
    return undefined;
  }
};
