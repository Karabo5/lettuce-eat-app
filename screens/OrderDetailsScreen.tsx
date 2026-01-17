import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { COLORS } from "../theme/colors";
import { useOrders, Order, OrderItem } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";

const OrderDetailsScreen = ({ route, navigation }: any) => {
  const { order } = route.params as { order: Order };
  const { updateOrderStatus } = useOrders();
  const { user } = useAuth();

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>
          You must be logged in to view order details.
        </Text>
      </View>
    );
  }

  if (order.userEmail !== user.email) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>You cannot view someone else's order.</Text>
      </View>
    );
  }

  const handleStatusUpdate = () => {
    updateOrderStatus(order.id, "Delivered");
    Alert.alert("Status Updated", "Order marked as Delivered");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Order Details</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{order.date}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Status:</Text>
        <Text
          style={[
            styles.value,
            order.status === "Delivered" ? styles.delivered : styles.pending,
          ]}
        >
          {order.status}
        </Text>
      </View>

      {order.status === "Pending" && (
        <TouchableOpacity style={styles.button} onPress={handleStatusUpdate}>
          <Text style={styles.buttonText}>Mark as Delivered</Text>
        </TouchableOpacity>
      )}

      <View style={styles.section}>
        <Text style={styles.label}>Delivery Address:</Text>
        <Text style={styles.value}>
          {order.address || "No address provided"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Payment:</Text>
        <Text style={styles.value}>{order.paymentCard || "Not provided"}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Items:</Text>
        {order.items.map((item: OrderItem) => (
          <View key={item.id} style={styles.itemRow}>
            <Text>
              {item.name} x {item.quantity}
            </Text>
            <Text>R {(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.total}>Total: R {order.total.toFixed(2)}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { color: COLORS.text, fontSize: 16 },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    color: COLORS.text,
  },
  section: { marginBottom: 16 },
  label: { fontWeight: "700", color: COLORS.text, marginBottom: 4 },
  value: { fontSize: 16, color: COLORS.text },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  total: { fontSize: 18, fontWeight: "700", marginTop: 12, color: COLORS.text },
  pending: { color: "#FFA500", fontWeight: "700" },
  delivered: { color: COLORS.darkGreen, fontWeight: "700" },
  button: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: { color: COLORS.white, fontWeight: "700" },
});

export default OrderDetailsScreen;
