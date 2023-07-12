import React, { useState, useCallback, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import Task1 from "./../components/Task1";
import { Feather, Fontisto } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function HomePage({ navigation }) {
  const [task, setTask] = useState();

  const [taskItems, setTaskItems] = useState({
    1: { id: "1", text: "7시 기상", completed: false },
    2: { id: "2", text: "서울역 9시 ktx", completed: false },
    3: {
      id: "3",
      text: "강릉역 → 동해막국수로 이동",
      completed: false,
    },
    4: { id: "4", text: "안목해변 카페투어!", completed: false },
    5: { id: "5", text: "중앙시장에서 야식 사오기", completed: false },
  });

  const addTask = () => {
    Keyboard.dismiss();
    const ID = Date.now().toString();
    const newTaskObject = { [ID]: { id: ID, text: task, completed: false } };
    setTask("");
    setTaskItems({ ...taskItems, ...newTaskObject });
  };

  const deleteTask = (id) => {
    const currentTasks = Object.assign({}, taskItems);
    delete currentTasks[id];
    setTaskItems(currentTasks);
  };

  const toggleTask = (id) => {
    const currentTasks = Object.assign({}, taskItems);
    if (currentTasks[id]) {
      currentTasks[id].completed = !currentTasks[id].completed;
      setTaskItems(currentTasks);
    }
  };

  const updateTask = (item) => {
    const currentTasks = Object.assign({}, taskItems);
    currentTasks[item.id] = item;
    setTaskItems(currentTasks);
  };

  const mapTask = () => {
    navigation.navigate("MapPage");
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../../assets/images/plane.png")}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Today's Tasks */}
          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>Travel TodoList</Text>
            <View style={styles.items}>
              {Object.values(taskItems).map((item) => {
                return (
                  <TouchableOpacity key={item.id}>
                    <Task1
                      key={item.id}
                      item={item}
                      deleteTask={deleteTask}
                      toggleTask={toggleTask}
                      mapTask={mapTask}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Write a task */}
        {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
        <View style={styles.writeTaskWrapper}>
          <TextInput
            style={styles.input}
            placeholder={"Write a task"}
            value={task}
            onChangeText={(text) => setTask(text)}
          />
          <TouchableOpacity onPress={() => addTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: "NanumSquareRoundB",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
    fontFamily: "NanumSquareRoundR",
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});

export default HomePage;
