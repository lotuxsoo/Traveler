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
  const [password, setPassword] = useState("");

  const passwordInputRef = createRef();

  const login = async () => {
    if (!name) {
      Alert.alert("이메일을 입력하세요.");
      return;
    }
    if (!password) {
      Alert.alert("비밀번호를 입력하세요.");
      return;
    }

    const response = await fetch("https://33dc-192-249-19-234.ngrok-free.app/login", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response.ok", response.ok);
    const responseData = await response.json();
    console.log("responseData", responseData);
    if (responseData.Login == true) {
      console.log(response.headers);
      AsyncStorage.setItem(
        "@userData",
        JSON.stringify(response.headers),
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
      }
    }
  };


  return (
    <LinearGradient style={{ flex: 1 }} colors={["#007260", "#B2DFDB"]}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text
            style={{
              color: "#FAFAFA",
              fontSize: 35,
              fontWeight: "800",
            }}
          >
            Welcome
          </Text>
          <Text
            style={{
              color: "#FAFAFA",
              fontSize: 20,
              fontWeight: "800",
            }}
          >
            Log in to your exist account
          </Text>
          <TextInput
            value={name}
            onChangeText={(name) => setName(name)}
            placeholder="Name"
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
            style={[styles.button, { backgroundColor: "#0148a4" }]}
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