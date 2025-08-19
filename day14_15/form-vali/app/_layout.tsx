import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/LoginScreen";
import RegisterScreen from "./src/RegisterScreeen";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
 
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>

  );
}
