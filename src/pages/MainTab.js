import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FindingPage from "./FindingPage";
import MyPage from "./MyPage";
import HomePage from "./HomePage";
import MapPage from "./MapPage";
import ReviewPage from "./ReviewPage";
import { Feather } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const FindingStack = createNativeStackNavigator();
const FindingStackNav = () => {
  return (
    <FindingStack.Navigator screenOptions={{ headerShown: false }}>
      <FindingStack.Screen name="FindingPage" component={FindingPage} />
      <FindingStack.Screen name="ReviewPage" component={ReviewPage} />
    </FindingStack.Navigator>
  );
};

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
        name="FindingStackNav"
        component={FindingStackNav}
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
