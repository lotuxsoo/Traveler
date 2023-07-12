import React, { useDebugValue, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const Task1 = ({ item, deleteTask, toggleTask, mapTask }) => {
  //const [isEditing, setIsEditing] = useState(false);
  const _handleUpdateButtonPress = () => {
    setIsEditing(true);
  };

  // const _onSubmitEditing = () => {
  //   if (isEditing) {
  //     const editedTask = Object.assign({}, item, { text });
  //     setIsEditing(false);
  //     updateTask(editedTask);
  //   }
  // };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        {item.completed ? (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => toggleTask(item.id)}
            id={item.id}
          >
            <Feather name="check-circle" size={25} color="black"></Feather>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => toggleTask(item.id)}
            id={item.id}
          >
            <Feather name="circle" size={25} color="black"></Feather>
          </TouchableOpacity>
        )}
        <Text style={{ fontSize: 15, fontFamily: "NanumSquareRoundR" }}>
          {item.text}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        {/* <TouchableOpacity style={{ marginLeft: 10 }}>
          <Feather
            name="edit"
            size={23}
            color="black"
            onPress={_handleUpdateButtonPress}
          ></Feather>
        </TouchableOpacity> */}
        <TouchableOpacity style={{ marginLeft: 10 }}>
          <Feather
            name="minus-circle"
            size={23}
            color="black"
            onPress={() => deleteTask(item.id)}
          ></Feather>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={mapTask}>
          <Feather name="map-pin" size={23} color="black"></Feather>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    // maxWidth: "80%",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task1;
