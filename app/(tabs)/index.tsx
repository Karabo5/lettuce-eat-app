import 'react-native-get-random-values';
import React from "react";
import AppNavigator from "@/navigation/AppNavigator";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";

export default function index() {
  return (
    <CartProvider>
      <AuthProvider>
        <OrderProvider>
            <AppNavigator />
        </OrderProvider>
      </AuthProvider>
    </CartProvider>
  );
}
