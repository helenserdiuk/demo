import React from "react";
import {
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import LogOut from "../../components/icon/iconLogOut";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../redux/auth/authSelector";

const ProfileScreen = ({ navigation }) => {
  const userInfo = useSelector(getUserInfo);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../image/img.png")}
      >
        <View
          style={{
            ...styles.component,
            // marginBottom: isShowKeyboard ? -168 : 0,
            alignItems: "center",
          }}
        >
          <View style={styles.imageWrapper}>
            <Image />
            <TouchableOpacity style={styles.iconWrapper}>
              <Image source={require("../../image/add.png")} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.6}
            style={{ position: "absolute", top: 22, right: 16 }}
            onPress={() => navigation.navigate("Login")}
          >
            <LogOut />
          </TouchableOpacity>
          <Text style={styles.title}>{userInfo.displayName}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    position: "relative",
  },
  component: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    marginTop: 147,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
  title: {
    textAlign: "center",
    color: "#212121",
    marginTop: 92,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "500",
  },
});

export default ProfileScreen;
