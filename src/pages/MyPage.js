import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";

function MyPage({ navigation }) {
  const signout = async () => {
    const response = await fetch("http://10.0.2.2:3001/signout", {
      method: "POST",
      body: JSON.stringify({
        email: 'aa'
      }),
      headers: {
        "Content-type": "application/json"
      }
    });
    if (response.ok) {
      setIsRegisterSuccess(true);
      alert("Successfully signed out");
    }
    const data = await response.json();
    navigation.navigate("SignupPage");
  }
  return(
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

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
  },
});

export default MyPage;
