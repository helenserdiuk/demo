import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

// import { createStackNavigator } from "@react-navigation/stack";
// const Stack = createStackNavigator();

import LoginScreen from "./Screens/auth/LoginScreens";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import HomeScreen from "./Screens/mainScreen/HomeScreen";
import CommentsScreen from "./Screens/nestedScreens/CommentsScreen";
import MapScreen from "./Screens/nestedScreens/MapScreen";
import DefaultScreens from "./Screens/auth/DefaultScreens";

import Back from "./components/icon/iconBack";

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
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          title: "Комментарии",
          headerBackTitleVisible: false,
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <Stack.Screen
        options={{
          title: "Карта",
          headerBackTitleVisible: false,
        }}
        name="MapScreen"
        component={MapScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconWrapper: {
    marginRight: 10,
    marginLeft: 20,
  },
});
