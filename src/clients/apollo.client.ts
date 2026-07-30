/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { config } from "../config";
import { Platform } from "react-native";

const getGraphqlUri = () => {
  let uri = config.graphqlBaseURL;
  if (!uri) {
    uri = Platform.OS === "android" ? "http://10.0.2.2:8000/graphql" : "http://localhost:8000/graphql";
  } else if (Platform.OS === "android" && uri.includes("localhost")) {
    uri = uri.replace("localhost", "10.0.2.2");
  }
  return uri;
};

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: getGraphqlUri(),
  }),
  cache: new InMemoryCache(),
});
