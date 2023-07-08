import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";

function SplashPage({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
          Let's get started
        </Text>

        {/* <View style={{}}>
            <Image></Image>
          </View> */}

        <View style={{}}>
          <TouchableOpacity
            style={[styles.submitcontainer, { backgroundColor: "#FAFAFA" }]}
            onPress={() =>
              navigation.navigate("MainTab", { screen: "HomePage" })
            }
          >
            <Text style={styles.submitText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  submitcontainer: {
    width: "45%",
    height: 50,
    borderColor: "#FAFAFA",
    borderRadius: 20,
    marginVertical: 10,
    borderWidth: 0,
  },
  submitText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    alignSelf: "center",
    marginVertical: 10,
  },
});

export default SplashPage;
