import { apolloClient } from "../../../../clients";
import { getGraphqlError, getItemInLocalStorage } from "../../../../utils";
import { REGISTER_PUSH_TOKEN, UNREGISTER_PUSH_TOKEN } from "./mutations";

export const registerPushToken = async (tokenValue: string, platform: string) => {
  try {
    const token = await getItemInLocalStorage("token");

    if (!token) {
      throw new Error("Unauthorized");
    }

    const { data } = await apolloClient.mutate<any>({
      mutation: REGISTER_PUSH_TOKEN,
      variables: {
        token: tokenValue,
        platform,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return {
      payload: data?.registerPushToken ?? null,
    };
  } catch (err: any) {
    const msg =
      getGraphqlError(err) ||
      "An error occurred while registering the push token.";
    throw new Error(msg);
  }
};

export const unregisterPushToken = async (tokenValue: string) => {
  try {
    const token = await getItemInLocalStorage("token");

    if (!token) {
      throw new Error("Unauthorized");
    }

    const { data } = await apolloClient.mutate<any>({
      mutation: UNREGISTER_PUSH_TOKEN,
      variables: {
        token: tokenValue,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return {
      payload: data?.unregisterPushToken ?? null,
    };
  } catch (err: any) {
    const msg =
      getGraphqlError(err) ||
      "An error occurred while unregistering the push token.";
    throw new Error(msg);
  }
};
