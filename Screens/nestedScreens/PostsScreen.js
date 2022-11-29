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
import { useSelector } from "react-redux";
import { getDatabase, ref, child, get } from "firebase/database";
import { getUserInfo } from "../../redux/auth/authSelector";

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const userInfo = useSelector(getUserInfo);

  useEffect(() => {
    const getPosts = async () => {
      await get(child(ref(getDatabase()), `posts/${userInfo.uid}`))
        .then(async (snapshot) => {
          if (snapshot.exists()) {
            const data = await snapshot.val();
            console.log(data);
            setPosts(Object.values(data));
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getPosts();
  }, [route.params]);

  // useEffect(() => {
  //   if (route.params) {
  //     setPosts((prevState) => {
  //       if (prevState.photo !== route.params.photo) {
  //         return [...prevState, route.params];
  //       }
  //     });
  //   }
  // }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.component}>
        <View style={styles.personInfo}>
          <View style={styles.imageWrapper}>
            <Image />
          </View>
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.login}>{userInfo.displayName}</Text>
            <Text style={styles.email}>{userInfo.email}</Text>
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
                  source={{ uri: item.pictureUrl }}
                  style={{ height: 240, width: "100%" }}
                />
                <View>
                  <Text style={styles.title}>{item.pictureName}</Text>
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
                        onPress={() =>
                          navigation.navigate("Comments", {
                            postId,
                            userId: userInfo.uid,
                            name: userInfo.displayName,
                          })
                        }
                      >
                        <Message />
                      </TouchableOpacity>
                      <Text
                        style={{ ...styles.text, color: "#bdbdbd", height: 18 }}
                      >
                        {item?.comments ? Object.keys(item.comments).length : 0}
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() =>
                          navigation.navigate("Map", {
                            location,
                          })
                        }
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
                        {item.pictureLocationName}
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
