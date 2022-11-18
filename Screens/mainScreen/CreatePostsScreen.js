import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Camera, Map, Trash } from "../../components/icon/icons";

const initialState = {
  title: "",
  location: "",
};

const CreatePostsScreen = () => {
  const [state, setState] = useState(initialState);

  const deleteForm = () => {
    setState(initialState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.component}>
        <View style={styles.imageWrapper}>
          <Image />
          <TouchableOpacity activeOpacity={0.6} style={styles.iconWrapper}>
            <Camera />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 8 }}>
          <Text style={{ ...styles.text, marginBottom: 48 }}>
            Загрузите фото
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Название"
            value={state.title}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, title: value }))
            }
          />
          <View style={{ position: "relative" }}>
            <TextInput
              style={{ ...styles.input, paddingLeft: 28 }}
              placeholder="Местность..."
              value={state.location}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, location: value }))
              }
            />
            <TouchableOpacity
              activeOpacity={0.6}
              style={{ position: "absolute" }}
            >
              <Map />
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.6} style={styles.btn}>
            <Text style={styles.text}>Опубликовать</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 34,
          left: "42%",
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
    // height: "100%",
  },
  component: {
    marginHorizontal: 16,
    marginVertical: 32,
  },
  imageWrapper: {
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
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
    marginBottom: 32,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  btn: {
    paddingHorizontal: 118,
    paddingVertical: 16,
    backgroundColor: "#f6f6f6",
    borderRadius: 100,
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
