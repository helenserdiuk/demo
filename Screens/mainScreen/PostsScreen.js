import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.component}>
        <View style={styles.imageWrapper}>
          <Image />
        </View>
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.login}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  component: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginLeft: 16,
  },
  imageWrapper: {
    backgroundColor: "#F6F6F6",
    borderRadius: 16,

    width: 60,
    height: 60,
  },
  login: {
    color: "#212121",
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
    fontSize: 13,
    lineHeight: 15,
    fontStyle: "normal",
  },
  email: {
    fontStyle: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});

export default PostsScreen;
