import React, { useState, useEffect, useRef, createRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

function LoginPage({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const passwordInputRef = createRef();

  const login = async () => {
    if (!name) {
      Alert.alert("이름을 입력하세요.");
      return;
    }
    if (!password) {
      Alert.alert("비밀번호를 입력하세요.");
      return;
    }

    const response = await fetch(
      "https://33dc-192-249-19-234.ngrok-free.app/login",
      {
        method: "POST",
        body: JSON.stringify({
          name: name,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();

    if (responseData.Login == true) {
      AsyncStorage.setItem(
        "@userData",
        JSON.stringify({
          name: name,
          password: password,
        }),
        (err) => {
          if (err) {
            console.log("an error");
            throw err;
          }
          console.log("success");
        }
      ).catch((err) => {
        console.log("2 an error");
      });

      if (response.ok) {
        Alert.alert("Login Success!");
        navigation.navigate("MainTab", { screen: "HomePage" });
      } else {
        Alert.alert("Login Failed!");
      }
    }
  };

  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("@token");
  //       if (token) {
  //         navigation.navigate("MainTab", { screen: "HomePage" });
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   checkToken();
  // }, []);

  return (
    <LinearGradient style={{ flex: 1 }} colors={["#2196F3", "#BBDEFB"]}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text
            style={{
              color: "#FAFAFA",
              fontSize: 35,
              marginBottom: 10,
              fontFamily: "NanumSquareRoundB",
            }}
          >
            Welcome
          </Text>
          <Text
            style={{
              color: "#FAFAFA",
              fontSize: 20,
              marginBottom: 10,
              fontFamily: "NanumSquareRoundR",
            }}
          >
            Log in to your exist account
          </Text>
          <TextInput
            value={name}
            onChangeText={(name) => setName(name)}
            placeholder="Full name"
            style={{
              fontSize: 15,
              borderRadius: 15,
              width: "80%",
              height: 50,
              marginVertical: 10,
              backgroundColor: "white",
              borderColor: "white",
              padding: 15,
            }}
            onSubmitEditing={() =>
              passwordInputRef.current && passwordInputRef.current.focus()
            }
            blurOnSubmit={false}
            // keyboardType="email-address"
            returnKeyType="next"
          />

          <TextInput
            value={password}
            onChangeText={(password) => setPassword(password)}
            placeholder="Password"
            style={{
              fontSize: 15,
              borderRadius: 15,
              width: "80%",
              height: 50,
              marginVertical: 10,
              backgroundColor: "white",
              borderColor: "white",
              padding: 15,
            }}
            secureTextEntry={true}
            blurOnSubmit={false}
            returnKeyType="done"
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#1976D2" }]}
            onPress={login}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.textBody}>Don't have an account</Text>
            <Text
              style={[styles.textBody, { color: "blue", marginLeft: 10 }]}
              onPress={() => {
                navigation.navigate("SignupPage");
              }}
            >
              Sign Up
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textTitle: {
    fontSize: 30,
    fontWeight: "600",
    marginVertical: 10,
  },
  textBody: {
    fontSize: 16,
  },
  input: {
    fontSize: 15,
    borderRadius: 15,
    width: "80%",
    height: 50,
    marginVertical: 10,
    backgroundColor: "white",
    borderColor: "white",
    padding: 15,
  },
  button: {
    width: "80%",
    height: 50,
    borderColor: "blue",
    borderRadius: 15,
    marginVertical: 10,
    borderWidth: 0,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    marginVertical: 10,
  },
  signupContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
});

export default LoginPage;
