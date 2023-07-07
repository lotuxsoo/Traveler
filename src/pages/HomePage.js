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

function HomePage({ navigation }) {
  return (
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
          Home
        </Text>
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

export default HomePage;
