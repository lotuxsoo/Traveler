import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import Task1 from "./../components/Task1";
import { Feather, Fontisto } from "@expo/vector-icons";

function HomePage({ navigation }) {
  const [task, setTask] = useState();

  const [taskItems, setTaskItems] = useState({
    1: { id: "1", text: "todo list 1", completed: false },
    2: { id: "2", text: "todo list 2", completed: false },
    3: { id: "3", text: "todo list 3", completed: false },
    4: { id: "4", text: "todo list 4", completed: false },
    5: { id: "5", text: "todo list 5", completed: false },
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
    // let itemsCopy = [...taskItems];
    // itemsCopy.splice(index, 1);
    // setTaskItems(itemsCopy);
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
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
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
                <TouchableOpacity>
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
    </View>
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
    fontWeight: "bold",
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
