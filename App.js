import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground, Platform } from "react-native";
import React, { useState } from "react";

import LoginScreen from "./Screens/LoginScreens";
import RegistrationScreen from "./Screens/RegistrationScreen";

// import * as Font from "expo-font";
// import { AppLoading } from "expo";

// const loadApplication = async () => {
//   await Font.loadAsync({
//     "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
//     "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
//   });
// };

export default function App() {
  // const [isReady, setIsReady] = useState(false);

  // if (!isReady) {
  //   return (
  //     <AppLoading
  //       startAsync={loadApplication}
  //       onFinish={() => setIsReady(true)}
  //       onError={console.warn()}
  //     />
  //   );
  // }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require("./image/img.png")}>
        {/* <LoginScreen /> */}
        <RegistrationScreen />
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === "ios" ? "#e5e5f5" : "#e8e8d8",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: 900,
  },
});
