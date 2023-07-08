import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Submit = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: props.color }]}
    >
      <Text style={styles.submitText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitcontainer: {
    width: "90%",
    height: 50,
    borderColor: "blue",
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 0,
  },
  submitText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    marginVertical: 10,
  },
});

export default Submit;
