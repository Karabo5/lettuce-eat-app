import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MenuScreen from "@/screens/MenuScreen";
import FoodDetailsScreen from "@/screens/FoodDetailsScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FoodDetails"
        component={FoodDetailsScreen}
        options={{ title: "Item Details" }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
