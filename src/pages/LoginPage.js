import React, { useEffect, useState } from "react";
// import {WebView} from 'react-native-webview';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useIsFocused} from '@react-navigation/native';

function LoginPage({ navigation }) {
  const handleLogin = () => {
    navigation.navigate("MainTab", { screen: "MainPage" });
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          marginVertical: 30,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={handleLogin}>
          <Image
            style={{ borderRadius: 10, marginVertical: 30, width: 200 }}
            source={require("../../assets/kakao.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
  },
  webview: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default LoginPage;
