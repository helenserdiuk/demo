import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import PostsScreen from "../nestedScreens/PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { Grid, Union, User } from "../../components/icon/iconsMenu";
import LogOut from "../../components/icon/iconLogOut";
import Back from "../../components/icon/iconBack";

const DefaultPosts = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="Posts"
        screenOptions={{
          tabBarStyle: {
            paddingHorizontal: 80,
          },
        }}
      >
        <Tab.Screen
          options={{
            title: "Публикации",
            headerTintColor: "#212121",
            headerTitleStyle: {
              fontFamily: "Roboto-Medium",
              fontWeight: "500",
              fontSize: 17,
              lineHeight: 22,
            },
            tabBarShowLabel: false,
            tabBarIcon: () => <Grid />,
            tabBarItemStyle: {
              marginTop: 9,
            },
            headerRight: () => (
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.iconWrapper}
                onPress={() => navigation.navigate("Login")}
              >
                <LogOut />
              </TouchableOpacity>
            ),
          }}
          name="Posts"
          component={PostsScreen}
        />
        <Tab.Screen
          options={{
            tabBarVisible: false,
            title: "Создать публикацию",
            headerTintColor: "#212121",
            tabBarStyle: { display: "none" },
            headerTitleStyle: {
              fontFamily: "Roboto-Medium",
              fontWeight: "500",
              fontSize: 17,
              lineHeight: 22,
            },
            tabBarShowLabel: false,
            tabBarIcon: () => <Union />,
            tabBarItemStyle: {
              backgroundColor: "#FF6C00",
              marginTop: 9,
              borderRadius: 20,
              marginHorizontal: 30,
              paddingHorizontal: 9,
            },
            headerLeft: () => (
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.iconWrapper}
                onPress={() => navigation.navigate("Posts")}
              >
                <Back />
              </TouchableOpacity>
            ),
          }}
          name="Create"
          component={CreatePostsScreen}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: () => <User />,
            tabBarItemStyle: {
              marginTop: 9,
            },
          }}
          name="Profile"
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconWrapper: {
    marginRight: 10,
    marginLeft: 20,
  },
});

export default DefaultPosts;
