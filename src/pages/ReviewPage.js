import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

function ReviewPage({ route, navigation }) {
  const { id } = route.params;
  const finding = async () => {
    try {
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
    } catch (error) {
      console.error("Error occurred during fetch:", error);
    }
  };

  finding();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default ReviewPage;
