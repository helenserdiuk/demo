import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import LoginScreen from "./Screens/auth/LoginScreens";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import Home from "./Screens/Home";

export default function UseRoute() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Registration"
        component={RegistrationScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
  );
}
