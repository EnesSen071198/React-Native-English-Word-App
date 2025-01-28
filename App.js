import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import A1ContentScreen from "./src/screens/A1ContentScreen";
import A2ContentScreen from "./src/screens/A2ContentScreen";
import B1ContentScreen from "./src/screens/B1ContentScreen";
import B2ContentScreen from "./src/screens/B2ContentScreen";
import IknowWord from "./src/components/IknowWord";
import IwillLearn from "./src/components/IwillLearn";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='A1Content' component={A1ContentScreen} />
        <Stack.Screen name='A2Content' component={A2ContentScreen} />
        <Stack.Screen name='B1Content' component={B1ContentScreen} />
        <Stack.Screen name='B2Content' component={B2ContentScreen} />
        <Stack.Screen name='IknowWord' component={IknowWord} />
        <Stack.Screen name='IwillLearn' component={IwillLearn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
