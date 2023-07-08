import axios from "axios";
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

function SignupPage({ navigation }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/signup", values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Traveler</Text>
        <Text style={styles.textBody}>Create an account</Text>
        {/* <Inputs name="Full Name" icon="user" />
          <Inputs name="Email" icon="envelope" />
          <Inputs name="Password" icon="lock" pass={true} />
          <Inputs name="Confirm Password" icon="lock" pass={true} /> */}
        <TextInput
          placeholder="Full name"
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
          style={[styles.submitcontainer, { backgroundColor: "#0251ce" }]}
          onPress={() => navigation.navigate("MainTab", { screen: "HomePage" })}
        >
          <Text style={styles.submitText}>Create</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textBody}>Already have an account</Text>
          <Text
            style={[styles.textBody, { color: "blue" }]}
            onPress={() => {
              navigation.navigate("LoginPage");
            }}
          >
            Login Here
          </Text>
        </View>
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
  image: {
    width: 400,
    height: 250,
    marginVertical: 10,
  },

  textTitle: {
    fontSize: 30,
    marginVertical: 10,
    fontWeight: "600",
  },
  textBody: {
    fontSize: 16,
  },
  submitcontainer: {
    width: "80%",
    height: 45,
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

export default SignupPage;
