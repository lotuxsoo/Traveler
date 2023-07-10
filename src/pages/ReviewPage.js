import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

function ReviewPage({ route, navigation }) {
  const { id } = route.params;

  const finding = async () => {
    const response = await fetch("http://10.0.2.2:3001/finding", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response.ok", response.ok);
    const responseData = await response.json();
    console.log("responseData", responseData);
  };
  finding();

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 30, fontSize: 20, color: "black" }}>{id}</Text>
      <View style={{}}>
        <Image
          style={{ height: "80%", width: "80%", resizeMode: "contain" }}
          source={require("../../assets/images/hanraa.jpg")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
  },
});

export default ReviewPage;
