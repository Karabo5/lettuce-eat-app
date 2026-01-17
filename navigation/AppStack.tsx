import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FoodDetailsScreen from "@/screens/FoodDetailsScreen";
import CheckoutScreen from "@/screens/CheckoutScreen";
import BottomTabs from "./BottomTabs";
import LoginScreen from "@/screens/LoginScreen";
import RegisterScreen from "@/screens/RegisterScreen";
import OrderDetailsScreen from "@/screens/OrderDetailsScreen";
import OrderHistoryScreen from "@/screens/OrderHistoryScreen";

import AdminLoginScreen from "@/admin/AdminLogin";
import AdminRegisterScreen from "@/admin/AdminRegisterScree";
import AdminDashboardScreen from "@/admin/AdminDashboardScreen";
import AdminPage from "@/admin/AdminPage";
import AdminMenu from "@/admin/AdminMenu";

export type AppStackParamList = {
  Tabs: undefined;
  FoodDetails: { item: any };
  Checkout: undefined;
  Login: undefined;
  Register: undefined;
  OrderDetails: { order: any };
  OrderDetailsSuccess: undefined;
  OrderHistory: undefined;

  AdminPage: undefined;
  AdminLogin: undefined;
  AdminRegister: undefined;
  AdminDashboard: undefined;
  AdminMenu: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }}>
      {/* User screens */}
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

      {/* Admin screens */}
      <Stack.Screen name="AdminPage" component={AdminPage} />
      <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
      <Stack.Screen name="AdminRegister" component={AdminRegisterScreen} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Stack.Screen
        name="AdminMenu"
        component={AdminMenu}
        options={{ headerShown: true, title: "Menu Management" }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
