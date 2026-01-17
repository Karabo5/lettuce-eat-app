import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: "Pending" | "Delivered";
  address?: string;
  paymentCard?: string;
  userEmail: string;
};

type OrderContextType = {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, newStatus: "Pending" | "Delivered") => void;
};

const OrderContext = createContext<OrderContextType | null>(null);

const ORDERS_KEY = "orders";

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(ORDERS_KEY);
      if (stored) setOrders(JSON.parse(stored));
    })();
  }, []);

  const saveOrders = async (ordersToSave: Order[]) => {
    await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(ordersToSave));
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => {
      const updated = [order, ...prev];
      saveOrders(updated);
      return updated;
    });
  };

  const updateOrderStatus = (orderId: string, newStatus: "Pending" | "Delivered") => {
    setOrders((prev) => {
      const updated = prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      saveOrders(updated);
      return updated;
    });
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
};
