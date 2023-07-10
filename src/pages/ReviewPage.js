import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

function ReviewPage({ navigation }) {
  const route = useRoute();
  const spot = route.params?.spot;
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 35, color: "white" }}>{spot}</Text>

      {/* <View style={styles.content}>
        <Image
          style={{ height: "100%", width: "100%", resizeMode: "contain" }}
          source={require("TestProject/images/img.jpg")}
        /> 
      </View> */}
    </View>
  );
}

export default ReviewPage;
