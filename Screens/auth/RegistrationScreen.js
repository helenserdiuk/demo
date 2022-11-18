import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
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
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ navigation }) => {
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
  };
  const { email, password } = state;
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    navigation.navigate("Login", { state });
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={onTouchWindow}>
      <ImageBackground
        style={styles.image}
        source={require("../../image/img.png")}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.container,
              marginBottom: isShowKeyboard ? -168 : 0,
              alignItems: "center",
            }}
          >
            <View style={styles.imageWrapper}>
              <Image />
              <TouchableOpacity style={styles.iconWrapper}>
                <Image source={require("../../image/add.png")} />
              </TouchableOpacity>
            </View>

            <Text style={styles.text}>Регистрация</Text>
            <View
              style={{
                width: dimensions,
              }}
            >
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
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.linkTitle}>Уже есть аккаунт? Войти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
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
    position: "relative",
    // marginTop: 323,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 78,
    fontStyle: "Roboto-Regular",
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
    fontFamily: "Roboto-Medium",
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
    paddingLeft: 16,
    fontSize: 16,
    lineHeight: 19,
    marginTop: 16,
    fontStyle: "Roboto-Regular",
    fontWeight: "400",
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
    top: 32,
    right: 16,
  },
  linkTitle: {
    textAlign: "center",
    color: "#1b4371",
    fontSize: 16,
    lineHeight: 19,
    fontStyle: "Roboto-Regular",
    fontWeight: "400",
  },
});

export default RegistrationScreen;
