import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FindingPage from "./FindingPage";
import MyPage from "./MyPage";
import HomePage from "./HomePage";
// import Icon from "react-native-vector-icons/AntDesign";

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="FindingPage"
        component={FindingPage}
        options={{
          tabBarLabel: "Finding",
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarLabel: "MyPage",
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
