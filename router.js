import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { isUserLogin } from "./redux/auth/authSelector";
import db from "./firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userCurrent } from "./redux/auth/authReducer";
import { useDispatch } from "react-redux";

const isAuth = () => {
  return useSelector(isUserLogin);
};

const Stack = createNativeStackNavigator();

import LoginScreen from "./Screens/auth/LoginScreens";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import Home from "./Screens/Home";

export default function UseRoute() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(getAuth(db), (user) => {
      if (user) {
        dispatch(
          userCurrent({
            token: user.accessToken,
            email: user.email,
            displayName: user.displayName,
            uid: user.uid,
          })
        );
      }
    });
  }, [dispatch]);

  return (
    <Stack.Navigator>
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
      {isAuth() && (
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
      )}
    </Stack.Navigator>
  );
}
