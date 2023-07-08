import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";

const Inputs = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocusChange = () => {
    setIsFocused(true);
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder={props.name}
        onFocus={onFocusChange}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        secureTextEntry={props.pass}
        leftIcon={
          <Icon
            name={props.icon}
            size={22}
            color={isFocused ? "#0779e4" : "grey"}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 50,
    borderRadius: 100,
    marginVertical: 10,
    borderWidth: 3.5,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputText: {
    color: "#0779e4",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
export default Inputs;
