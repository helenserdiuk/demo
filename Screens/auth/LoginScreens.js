import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = ({ navigation, route }) => {
  //   console.log(Platform);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimenions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      if (width > 500) {
        return setDimenions(Dimensions.get("window").width - 32 * 2);
      }
      setDimenions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const showPassword = () => {
    setIsShowPassword(false);
    if (isShowPassword === false) {
      setIsShowPassword(true);
    }
  };

  const onTouchWindow = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState({ ...route.params });
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // console.log(state);
    navigation.navigate("Home");
    setState(initialState);
  };

  return (
    <ImageBackground
      style={styles.image}
      source={require("../../image/img.png")}
    >
      <TouchableWithoutFeedback onPress={onTouchWindow}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.container,
              alignItems: "center",
              paddingBottom: isShowKeyboard ? 16 : 144,
            }}
          >
            <Text style={styles.text}>Войти</Text>
            <View>
              <View
                style={{
                  width: dimensions,
                }}
              >
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
                <View style={{ marginTop: 16, position: "relative" }}>
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
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
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
                  <Text style={styles.btnTitle}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => navigation.navigate("Registration")}
                >
                  <Text style={styles.linkTitle}>
                    Нет аккаунта? Зарегистрироваться
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    position: "relative",
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  text: {
    textAlign: "center",
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 35,
    marginTop: 32,
    marginBottom: 33,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#f0f8ff",
    backgroundColor: "#e8e8e8",
    borderRadius: 8,
    paddingLeft: 16,
    fontStyle: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  btn: {
    height: 51,
    backgroundColor: "#ff6c00",
    borderRadius: 100,
    border: 1,
    borderColor: "#ff6c00",
    marginTop: 43,
    marginBottom: 16,
    justifyContent: "center",
  },
  btnTitle: {
    color: "#fff",
    textAlign: "center",
    fontStyle: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  password: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  linkTitle: {
    textAlign: "center",
    color: "#1b4371",
    fontStyle: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
});

export default LoginScreen;
