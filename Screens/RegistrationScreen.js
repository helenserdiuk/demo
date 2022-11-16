import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

import * as Font from "expo-font";
// import { AppLoading } from "expo";

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });
};

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = () => {
  //   console.log(Platform);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [state, setState] = useState(initialState);
  //   const [isReady, setIsReady] = useState(false);
  //   if (!isReady) {
  //     return (
  //       <AppLoading startAsync={loadFonts} onFinish={() => setIsReady(true)} />
  //     );
  //   }

  const showPassword = () => {
    setIsShowPassword(false);
    if (isShowPassword === false) {
      setIsShowPassword(true);
    }
  };

  const onTouchWindow = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={onTouchWindow}>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          position: "relative",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.container,
              marginBottom: isShowKeyboard ? -168 : 0,
            }}
          >
            <View style={styles.imageWrapper}>
              <Image />
              <View style={styles.iconWrapper}>
                <Image source={require("../image/add.png")} />
              </View>
            </View>

            <Text style={styles.text}>Регистрация</Text>
            <TextInput
              style={styles.input}
              placeholder="Логин"
              maxLength={50}
              value={state.login}
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, login: value }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Адрес электронной почты"
              keyboardType="email-address"
              maxLength={40}
              value={state.email}
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, email: value }))
              }
            />
            <View style={{ position: "relative" }}>
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry={isShowPassword}
                maxLength={30}
                value={state.password}
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
              />
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.password}
                onPress={showPassword}
              >
                <Text style={styles.linkTitle}>Показать</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.btn}
              onPress={keyboardHide}
            >
              <Text style={styles.btnTitle}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.linkTitle}>Уже есть аккаунт? Войти</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    // marginTop: 323,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 78,
    fontStyle: Platform.OS === "ios" ? "Roboto-Regular" : "Roboto",
    fontWeight: "400",
    // height: 490,
    ...Platform.select({
      ios: {
        // backgroundColor: "#000000",
      },
      android: {
        // position: "absolute",
        // marginBottom: 20,
      },
    }),
  },
  imageWrapper: {
    position: "absolute",
    top: -60,
    left: "35%",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,

    width: 120,
    height: 120,
  },
  iconWrapper: { position: "absolute", right: -10, bottom: 15 },
  text: {
    textAlign: "center",
    color: "#212121",
    // fontFamily: Platform.OS === "ios" ? "Roboto-Medium" : "Roboto",
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 35,
    marginTop: 92,
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#f0f8ff",
    backgroundColor: "#e8e8e8",
    borderRadius: 8,
    marginHorizontal: 16,
    paddingLeft: 16,
    fontSize: 16,
    lineHeight: 19,
    marginTop: 16,
  },
  btn: {
    height: 51,
    marginHorizontal: 16,
    backgroundColor: "#ff6c00",
    borderRadius: 100,
    border: 1,
    borderColor: "#ff6c00",
    marginTop: 43,
    marginBottom: 16,
    fontSize: 16,
    justifyContent: "center",
  },
  btnTitle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
  },
  password: {
    position: "absolute",
    top: 32,
    right: 32,
  },
  linkTitle: {
    textAlign: "center",
    color: "#1b4371",
    fontSize: 16,
    lineHeight: 19,
  },
});

export default RegistrationScreen;
