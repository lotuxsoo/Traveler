import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

function MyPage({ navigation }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await AsyncStorage.getItem("@userData");

        const jsonObject = JSON.parse(data);
        // console.log("jsonObject", jsonObject.name);

        setName(jsonObject.name);
        // setId(jsonObject.map.id);
      } catch (err) {
        console.log("err");
      }
    };
    getData();
  }, []);

  const signout = async () => {
    const response = await fetch("https://33dc-192-249-19-234.ngrok-free.app/signout", {
      method: "POST",
      body: JSON.stringify({
        name: name,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response.ok) {
      Alert.alert("Signed out!");
      navigation.navigate("SplashPage");
    } else {
      console.log(response);
    }
    console.log(sign);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      {/* <ImageBackground
        source={require("../../assets/images/plane.png")}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      > */}
      {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Image
        style={styles.logo}
        source={require("../../assets/images/logo.png")}
      />
    </View> */}
      <View style={styles.first}>
        <Text style={styles.title}>마이페이지</Text>
      </View>

      <View style={styles.profile}>
        <FontAwesome name="user" size={50} />
        <Text style={styles.name}>{name} 님</Text>
      </View>

      {/* <View style={styles.second}>
      <Text style={styles.menu}>나의 루틴들</Text>
      <Pressable onPress={onMinePressed}>
        <FontAwesome name="chevron-right" size={23} style={styles.icon} />
      </Pressable>
    </View>

    <View style={styles.second}>
      <Text style={styles.menu}>스크랩한 모닝 루틴들</Text>
      <Pressable onPress={onScrapPressed}>
        <FontAwesome name="chevron-right" size={23} style={styles.icon} />
      </Pressable>
    </View> */}
      <View
        style={{
          borderBottomColor: "#C4C4C4",
          borderBottomWidth: 1,
          marginTop: 10,
          marginBottom: 10,
        }}
      />

      <View style={styles.second}>
        <Text style={{ fontSize: 20, fontFamily: "NanumSquareRoundR" }}>
          로그아웃
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SplashPage");
            Alert.alert("Log out!");
          }}
        >
          <FontAwesome name="chevron-right" size={23} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.second}>
        <Text style={{ fontSize: 20, fontFamily: "NanumSquareRoundR" }}>
          회원탈퇴
        </Text>
        <TouchableOpacity onPress={signout}>
          <FontAwesome name="chevron-right" size={23} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    //width: 280,
    //  height: 290,
    top: 270,
    opacity: 0.5,
  },
  title: {
    color: "black",
    fontSize: 20,
    fontFamily: "NanumSquareRoundR",
    marginLeft: 25,
  },
  profile: {
    flexDirection: "row",
    alignContent: "center",
    marginLeft: 25,
    marginVertical: 15,
    // alignContent: "center",
  },
  name: {
    color: "black",
    fontSize: 25,
    marginLeft: 18,
    alignItems: "center",
    top: 10,
    fontFamily: "NanumSquareRoundB",
  },
  first: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    marginTop: 20,
  },
  second: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 25,
    alignItems: "center",
    justifyContent: "space-between",
  },

  icon: {
    marginRight: 15,
    color: "#757575",
    padding: 20,
  },
});

export default MyPage;

/* return (
    <SafeAreaView style={styles.container}>
      <View style={{}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginHorizontal: 15,
            marginVertical: 15,
          }}
        >
          MyPage
        </Text>
        <TouchableOpacity
          style={[styles.submitcontainer, { backgroundColor: "white" }]}
          onPress={signout}
        >
          <Text style={styles.submitText}>Signout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
*/
