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

function SignupPage({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [errortext, setErrortext] = useState("");

  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();

  const signUp = async () => {
    if (!username) {
      alert("이름을 입력하세요.");
      return;
    }
    if (!email) {
      alert("이메일을 입력하세요.");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    const response = await fetch("http://10.0.2.2:3001/signup", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json"
      }
    });
    if (response.ok) {
      setIsRegisterSuccess(true);
      alert("Register Success!");
    }
    const data = await response.json();

  if (isRegisterSuccess) {
    navigation.navigate("MainTab", { screen: "HomePage" })
  };
}
  //   const [values, setValues] = useState({
  //     usename: "",
  //     email: "",
  //     password: "",
  //   });

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     axios
  //       .post("http://localhost:8081/signup", values)
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => console.log(err));
  //   };

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
          value={username}
          onChangeText={(username) => setUsername(username)}
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
          ref={nameRef}
          //enter눌렀을때
          onSubmitEditing={() => emailRef.current && emailRef.current.focus()}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
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
          ref={emailRef}
          //enter눌렀을때
          onSubmitEditing={() =>
            passwordRef.current && passwordRef.current.focus()
          }
          blurOnSubmit={false}
          keyboardType="email-address"
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
          ref={passwordRef}
          onSubmitEditing={Keyboard.dismiss}
          secureTextEntry={true}
          blurOnSubmit={false}
          returnKeyType="next"
        />

        <TouchableOpacity
          style={[styles.submitcontainer, { backgroundColor: "#0251ce" }]}
          onPress={signUp}
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
    backgroundColor: "#81C784",
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
