import React, { useEffect, useState } from "react";
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
} from "react-native";
// import Inputs from "../components/Inputs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function LoginPage({ navigation }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState(null);

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
        <View style={{ marginTop: 20 }} />
        {/* <Inputs name="Email" icon="user" />
          <Inputs name="Password" icon="lock" pass={true} /> */}
        <TextInput
          placeholder="Email"
          style={{
            fontSize: 15,
            borderRadius: 15,
            width: "80%",
            height: 50,
            marginVertical: 10,
            backgroundColor: "#E3F2FD",
            borderColor: "#E3F2FD",
            padding: 15,
          }}
        />

        <TextInput
          placeholder="Password"
          style={{
            fontSize: 15,
            borderRadius: 15,
            width: "80%",
            height: 50,
            marginVertical: 10,
            backgroundColor: "#E3F2FD",
            borderColor: "#E3F2FD",
            padding: 15,
          }}
        />

        <TouchableOpacity
          style={[styles.submitcontainer, { backgroundColor: "#0148a4" }]}
          onPress={() => navigation.navigate("MainTab", { screen: "HomePage" })}
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
    backgroundColor: "white",
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
