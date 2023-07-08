import React, { useState, useEffect, useRef } from "react";
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

function LoginPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const login = async () => {
    if (!email) {
      Alert.alert("이메일을 입력하세요.");
      return;
    }
    if (!password) {
      Alert.alert("비밀번호를 입력하세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // const headers = response.headers;
        // AsyncStorage.setItem("@userData", JSON.stringify(headers), (err) => {
        //   if (err) {
        //     console.log("an error");
        //     throw err;
        //   }
        //   console.log("success");
        // }).catch((err) => {
        //   console.log("2 an error");
        // });

        // Alert.alert("Login Success!");
        const data = await response.json();
        console.log("data", data);

        //const token = data.token; // 토큰을 받아온다고 가정하고, 실제 토큰 값을 받아올 수 있는 방식으로 수정해야 합니다.

        // AsyncStorage.setItem("@token", token, (err) => {
        //   if (err) {
        //     console.log("Failed to save token.");
        //   } else {
        //     console.log("Token saved successfully.");
        //   }
        // });
        // if (token) {
        //   AsyncStorage.setItem("@token", token, (err) => {
        //     if (err) {
        //       console.log("Failed to save token.");
        //     } else {
        //       console.log("Token saved successfully.");
        //     }
        //   });
        // } else {
        //   console.log("Token is null or undefined.");
        // }
        //   if (data.email && data.password) {
        //     const token = generateToken(data.email, data.password); // 토큰을 생성하는 방법은 백엔드와의 협의가 필요합니다.

        //     AsyncStorage.setItem("@token", token, (err) => {
        //       if (err) {
        //         console.log("Failed to save token.");
        //       } else {
        //         console.log("Token saved successfully.");
        //       }
        //     });
        //   } else {
        //     console.log("Email or password is missing.");
        //   }

        //   Alert.alert("Login Success!");
        //   //navigation.navigate("MainTab", { screen: "HomePage" });
        // } else {
        //   Alert.alert("Login failed");
        // }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("@token");
        if (token) {
          navigation.navigate("MainTab", { screen: "HomePage" });
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkToken();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Welcome</Text>
        <Text style={styles.textBody}>Log in to your exist account</Text>
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
          style={[styles.button, { backgroundColor: "#0148a4" }]}
          onPress={login}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.textBody}>Don't have an account</Text>
          <Text
            style={[styles.textBody, { color: "blue" }]}
            onPress={() => {
              navigation.navigate("SignupPage");
            }}
          >
            Sign Up
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
