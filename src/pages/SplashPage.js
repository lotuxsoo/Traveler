import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

function SplashPage({ navigation }) {
  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../../assets/images/splashground.png")}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginLeft: 30,
          }}
        >
          <Text
            style={{
              color: "#FAFAFA",
              fontSize: 40,
              fontFamily: "NanumSquareRoundB",
            }}
          >
            Let's travel!
          </Text>

          <TouchableOpacity
            style={[styles.submitcontainer, { backgroundColor: "#FAFAFA" }]}
            onPress={
              //() => navigation.navigate("MainTab", { screen: "HomePage" })
              navigation.navigate("SignupPage")
            }
          >
            <Text style={styles.submitText}>Join Now</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  submitcontainer: {
    width: "50%",
    height: 50,
    borderColor: "#FAFAFA",
    borderRadius: 20,
    marginVertical: 10,
    borderWidth: 0,
    justifyContent: "center",
  },
  submitText: {
    fontSize: 20,
    color: "black",
    alignSelf: "center",
    marginVertical: 10,
    fontFamily: "NanumSquareRoundB",
  },
});

export default SplashPage;
