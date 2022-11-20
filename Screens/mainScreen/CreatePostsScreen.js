import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { Camera } from "expo-camera";
import { Foto, Map, Trash } from "../../components/icon/icons";
import * as Location from "expo-location";

const initialState = {
  title: "",
  map: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    const location = await Location.getCurrentPositionAsync();
    // console.log(location.coords);
    setLocation(location.coords);
  };

  const onTouchWindow = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(state);
  };

  const sendPhoto = () => {
    const { latitude, longitude } = location;
    navigation.navigate("Posts", { photo, ...state, latitude, longitude });
    setPhoto(() => "");
    setState(initialState);
    setLocation(() => null);
  };

  const openLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return (
        <View style={styles.container}>
          <Text style={{ textAlign: "center" }}>
            "Permission to access location was denied";
          </Text>
        </View>
      );
    }
    if (status === "granted") {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: "red",
          }}
        >
          <Text style={{ textAlign: "center" }}>
            "Permission to access location was granted";
          </Text>
        </View>
      );
    }
    const location = await Location.getCurrentPositionAsync();
    setLocation(location);
  };

  const deleteForm = () => {
    setIsShowKeyboard(false);
    setPhoto("");
    setState(initialState);
    setLocation(null);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onTouchWindow}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.component,
              marginTop: isShowKeyboard ? -10 : 32,
            }}
          >
            <View style={styles.imageWrapper}>
              <Camera style={styles.camera} ref={setCamera}>
                {photo && <Image source={{ uri: photo }} style={styles.img} />}
              </Camera>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.iconWrapper}
                onPress={takePhoto}
              >
                <Foto />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 8 }}>
              {!photo ? (
                <Text style={{ ...styles.text, marginBottom: 48 }}>
                  Загрузите фото
                </Text>
              ) : (
                <Text style={{ ...styles.text, marginBottom: 48 }}>
                  Редактировать фото
                </Text>
              )}
              <TextInput
                style={{
                  ...styles.input,
                  fontFamily: "Roboto-Medium",
                  fontWeight: "500",
                }}
                placeholder="Название"
                value={state.title}
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, title: value }))
                }
              />
              <View style={{ position: "relative" }}>
                <TextInput
                  style={{
                    ...styles.input,
                    paddingLeft: 28,
                    fontFamily: "Roboto-Regular",
                    fontWeight: "400",
                  }}
                  placeholder="Местность..."
                  value={state.map}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, map: value }))
                  }
                />
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{ position: "absolute" }}
                  onPress={openLocation}
                >
                  <Map />
                </TouchableOpacity>
              </View>
              {!state.title || !state.map || !photo ? (
                <TouchableOpacity activeOpacity={0.6} style={styles.btn}>
                  <Text style={styles.text}>Опубликовать</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.btnActive}
                  onPress={sendPhoto}
                >
                  <Text style={styles.textActive}>Опубликовать</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: 120,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.iconDelete}
              onPress={deleteForm}
            >
              <Trash />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  component: {
    marginHorizontal: 16,
    marginVertical: 32,
    position: "relative",
  },
  imageWrapper: {
    height: 240,
    // backgroundColor: "#f6f6f6",
    // borderRadius: 8,
    // borderWidth: 1,
    // borderColor: "#e8e8e8",
    // justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  camera: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e8e8e8",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e8e8e8",
  },
  iconWrapper: {
    position: "absolute",
    top: 90,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 60,
    height: 60,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  input: {
    paddingBottom: 15,
    borderWidth: 1,
    borderLeftColor: "#fff",
    borderRightColor: "#fff",
    borderTopColor: "#fff",
    borderBottomColor: "#e8e8e8",
    placeholder: {
      fontStyle: "Roboto-Regular",
      fontWeight: "400",
      color: "red",
    },
    marginBottom: 32,
    fontSize: 16,
    lineHeight: 19,
  },
  btn: {
    paddingHorizontal: 118,
    paddingVertical: 16,
    backgroundColor: "#f6f6f6",
    borderRadius: 100,
  },
  btnActive: {
    paddingHorizontal: 118,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  textActive: {
    color: "#fff",
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  iconDelete: {
    width: 70,
    paddingHorizontal: 23,
    paddingVertical: 8,
    backgroundColor: "#f6f6f6",
    borderRadius: 100,
  },
});

export default CreatePostsScreen;
