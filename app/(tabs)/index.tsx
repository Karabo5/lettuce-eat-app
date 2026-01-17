import React from "react";
import AppNavigator from "@/navigation/AppNavigator";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { MenuProvider } from "@/context/MenuContext";

export default function index() {
  return(
<AuthProvider>
  <MenuProvider>
    <CartProvider>
      <OrderProvider>
      <AppNavigator />
      </OrderProvider>
    </CartProvider>
  </MenuProvider>
</AuthProvider>
  )
}