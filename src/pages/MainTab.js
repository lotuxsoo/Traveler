import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FindingPage from "./FindingPage";
import MyPage from "./MyPage";
import HomePage from "./HomePage";
import MapPage from "./MapPage";
import { Feather } from "@expo/vector-icons";

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
          tabBarIcon: ({ tintColor }) => (
            <Feather name="home" size={28}></Feather>
          ),
        }}
      />
      <Tab.Screen
        name="MapPage"
        component={MapPage}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ tintColor }) => (
            <Feather name="map" size={28}></Feather>
          ),
        }}
      />
      <Tab.Screen
        name="FindingPage"
        component={FindingPage}
        options={{
          tabBarLabel: "Finding",
          tabBarIcon: ({ tintColor }) => (
            <Feather name="search" size={28}></Feather>
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarLabel: "MyPage",
          tabBarIcon: ({ tintColor }) => (
            <Feather name="user" size={28}></Feather>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
