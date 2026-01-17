import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FoodDetailsScreen from "@/screens/FoodDetailsScreen";
import CheckoutScreen from "@/screens/CheckoutScreen";
import BottomTabs from "./BottomTabs";
import LoginScreen from "@/screens/LoginScreen";
import RegisterScreen from "@/screens/RegisterScreen";
import OrderDetailsScreen from "@/screens/OrderDetailsScreen";
import OrderHistoryScreen from "@/screens/OrderHistoryScreen";


export type AppStackParamList = {
  Tabs: undefined;
  FoodDetails: { item: any };
  Checkout: undefined;
  Login: undefined;
  Register: undefined;
  OrderDetails: { order: any };
  OrderDetailsSuccess: undefined;
  OrderHistory: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Tabs" component={BottomTabs} />
      <Stack.Screen
        name="FoodDetails"
        component={FoodDetailsScreen}
        options={{ headerShown: true, title: "Food Details" }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ headerShown: true, title: "Checkout" }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{ headerShown: true, title: "Order Details" }}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{ headerShown: true, title: "My Orders" }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
