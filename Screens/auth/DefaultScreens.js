import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const Nested = createStackNavigator();

import HomeScreen from "../mainScreen/HomeScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import PostsScreen from "../nestedScreens/PostsScreen";
import Back from "../../components/icon/iconBack";

export default function DefaultScreens() {
  return (
    <Nested.Navigator>
      <Nested.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={HomeScreen}
      />
      {/* <Nested.Screen name="Posts" component={PostsScreen} /> */}
      <Nested.Screen name="Comments" component={CommentsScreen} />
      <Nested.Screen name="MapScreen" component={MapScreen} />
    </Nested.Navigator>
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
