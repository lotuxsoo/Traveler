import React, { useState, useRef } from "react";
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

function SignupPage({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //   // 토큰 생성 함수
  //   const generateToken = (email, password) => {
  //     // 토큰을 생성하는 로직을 구현합니다.
  //     // 예시로 JWT를 사용하는 경우:
  //     const token = Jwt.sign({ email, password }, "secretKey");
  //     console.log(token);
  //     return token;
  //   };

  const signUp = async () => {
    if (!username) {
      Alert.alert("이름을 입력하세요.");
      return;
    }
    if (!email) {
      Alert.alert("이메일을 입력하세요.");
      return;
    }
    if (!password) {
      Alert.alert("비밀번호를 입력하세요.");
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Traveler</Text>
        <Text style={styles.textBody}>Create an account</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Full name"
          style={styles.input}
          ref={nameRef}
          onSubmitEditing={() => emailRef.current.focus()}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
          ref={emailRef}
          onSubmitEditing={() => passwordRef.current.focus()}
          blurOnSubmit={false}
          keyboardType="email-address"
          returnKeyType="next"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          style={styles.input}
          ref={passwordRef}
          onSubmitEditing={Keyboard.dismiss}
          secureTextEntry={true}
          blurOnSubmit={false}
          returnKeyType="done"
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#0251ce" }]}
          onPress={signUp}
        >
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
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
  textTitle: {
    fontSize: 30,
    marginVertical: 10,
    fontWeight: "600",
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
    height: 45,
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
  loginContainer: {
    flexDirection: "row",
  },
});

export default SignupPage;
