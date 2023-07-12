import React, { useCallback, useEffect, useState } from "react";
import { View, KeyboardAvoidingView, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashPage from "./src/pages/SplashPage";
import SignupPage from "./src/pages/SignupPage";
import LoginPage from "./src/pages/LoginPage";
import MainTab from "./src/pages/MainTab";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

LogBox.ignoreAllLogs();

function App() {
  const Stack = createNativeStackNavigator();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          NanumSquareRoundR: require("./assets/NanumGothicCoding-Regular.ttf"),
          NanumSquareRoundB: require("./assets/NanumGothicCoding-Bold.ttf"),
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashPage" component={SplashPage} />
          <Stack.Screen name="SignupPage" component={SignupPage} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="MainTab" component={MainTab} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
export default App;
