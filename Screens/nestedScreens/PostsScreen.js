import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Map, Message } from "../../components/icon/icons";

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  console.log(posts);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => {
        if (prevState.photo !== route.params.photo) {
          return [...prevState, route.params];
        }
      });
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.component}>
        <View style={styles.personInfo}>
          <View style={styles.imageWrapper}>
            <Image />
          </View>
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.login}>Natali Romanova</Text>
            <Text style={styles.email}>email@example.com</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 32,
            marginBottom: 128,
          }}
        >
          <FlatList
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  marginBottom: 34,
                }}
              >
                <Image
                  source={{ uri: item.photo }}
                  style={{ height: 240, width: "100%" }}
                />
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        height: 18,
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.navigate("Comments")}
                      >
                        <Message />
                      </TouchableOpacity>
                      <Text
                        style={{ ...styles.text, color: "#bdbdbd", height: 18 }}
                      >
                        0
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.navigate("MapScreen")}
                      >
                        <Map />
                      </TouchableOpacity>
                      <Text
                        style={{
                          ...styles.text,
                          color: "#212121",
                          textDecorationLine: "underline",
                        }}
                      >
                        {item.map}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
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
    marginTop: 32,
    marginHorizontal: 16,
  },
  personInfo: {
    flexDirection: "row",
    alignItems: "center",
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
  title: {
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginTop: 8,
    marginBottom: 11,
  },
  text: {
    fontStyle: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 8,
  },
});

export default PostsScreen;
