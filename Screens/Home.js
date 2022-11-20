import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();

import DefaultPosts from "./mainScreen/DefaultPosts";
import MapScreen from "./nestedScreens/MapScreen";
import CommentsScreen from "./nestedScreens/CommentsScreen";
import Back from "../components/icon/iconBack";

function Home({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="DefaultPosts"
        component={DefaultPosts}
      />
      <Stack.Screen
        options={{
          title: "Карта",
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.iconWrapper}
              onPress={() => navigation.navigate("DefaultPosts")}
            >
              <Back />
            </TouchableOpacity>
          ),
        }}
        name="Map"
        component={MapScreen}
      />
      <Stack.Screen
        options={{
          title: "Комментарии",
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.iconWrapper}
              onPress={() => navigation.navigate("DefaultPosts")}
            >
              <Back />
            </TouchableOpacity>
          ),
        }}
        name="Comments"
        component={CommentsScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    marginRight: 10,
    marginLeft: 20,
  },
});

export default Home;
