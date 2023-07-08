import axios from "axios";
import React, { useEffect, useState, createRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  TextInput,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");

  const login = async () => {
    if (!email) {
      alert("이메일을 입력하세요.");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력하세요.");
      return;
    }
    //setLoading(true);

    const response = await fetch("http://10.0.2.2:3001/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(response.ok);
    const responseData = await response.json();
    console.log(responseData);
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
      alert("Login Success!");
      navigation.navigate("MainTab", { screen: "HomePage" });
    } else {
      alert("Login failed");
    }
  };

  // const save = async () => {
  //   try {
  //     const res = await axios.post("/login", { emial, password });
  //     setUser(res.data);
  //   } catch (err) {
  //     // await AsyncStorage.setItem("token", username);
  //     // navigation.navigate("MainTab", { screen: "HomePage" });
  //     console.log(err);
  //   }
  // };

  // const load = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("token");
  //     if (value !== null) {
  //       navigation.navigate("MainTab", { screen: "HomePage" });
  //     }
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Welcome</Text>
        <Text style={styles.textBody}>Log in to your exist account</Text>
        <View style={{ marginBottom: 30 }} />
        {/* <Inputs name="Email" icon="user" />
          <Inputs name="Password" icon="lock" pass={true} /> */}
        <TextInput
          value={email}
          onChangeText={(email) => setEmail(email)}
          placeholder="Emails"
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
          keyboardType="email-address"
          returnKeyType="next"
        />

        <TextInput
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder="Passwords"
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
          returnKeyType="next"
        />

        <TouchableOpacity
          style={[styles.submitcontainer, { backgroundColor: "#0148a4" }]}
          onPress={login}
        >
          <Text style={styles.submitText}>Log In</Text>
        </TouchableOpacity>

        <Text style={{ flexDirection: "row", marginVertical: 5 }}>
          <Text style={styles.textBody}>Don't have an account</Text>
          <Text
            style={[styles.textBody, { color: "blue" }]}
            onPress={() => {
              navigation.navigate("SignupPage");
            }}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#81C784",
    justifyContent: "center",
  },
  // header: {
  //   flex: 2,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // footer: {
  //   flex: 3,
  //   backgroundColor: "#fff",
  //   borderTopLeftRadius: 30,
  //   borderTopRightRadius: 30,
  //   paddingVertical: 50,
  //   paddingHorizontal: 30,
  // },
  textTitle: {
    fontSize: 30,
    fontWeight: "600",
    marginVertical: 10,
  },
  textBody: {
    fontSize: 16,
  },
  submitcontainer: {
    width: "80%",
    height: 50,
    borderColor: "blue",
    borderRadius: 15,
    marginVertical: 10,
    borderWidth: 0,
  },
  submitText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    marginVertical: 10,
  },
});

export default LoginPage;
