import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { COLORS } from "../theme/colors";
import { useOrders } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";

const OrderHistoryScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const { orders } = useOrders();

  if (!user) {
    return (
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg",
        }}
        style={styles.container}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.lockedTitle}>Login Required 🔒</Text>
          <Text style={styles.lockedText}>
            You must be logged in to view your orders.
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginText}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  const userOrders = orders.filter((order) => order.userEmail === user.email);

  return (
    <FlatList
      data={userOrders}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <Text style={styles.title}>
          <Text style={styles.orderMy}>My </Text>
          <Text style={styles.orderOrders}>Orders</Text>
        </Text>
      }
      ListEmptyComponent={<Text style={styles.emptyText}>No orders yet</Text>}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("OrderDetails", { order: item })}
        >
          <View style={styles.row}>
            <Text style={styles.date}>{item.date}</Text>
            <Text
              style={[
                styles.status,
                item.status === "Delivered" ? styles.delivered : styles.pending,
              ]}
            >
              {item.status}
            </Text>
          </View>
          <Text style={styles.total}>Total: R {item.total.toFixed(2)}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  lockedTitle: { fontSize: 28, fontWeight: "700", color: COLORS.white, marginBottom: 12 },
  lockedText: { fontSize: 18, color: COLORS.white, textAlign: "center", marginBottom: 20 },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  loginText: { color: COLORS.white, fontWeight: "700", fontSize: 16 },

  title: { fontSize: 26, fontWeight: "700", marginBottom: 20, color: COLORS.text },
  orderMy: { color: COLORS.text },
  orderOrders: { color: COLORS.primary },
  card: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 14 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  date: { fontSize: 14, color: COLORS.gray },
  status: { fontSize: 14, fontWeight: "700" },
  pending: { color: "#FFA500" },
  delivered: { color: COLORS.darkGreen },
  total: { fontSize: 16, fontWeight: "700", color: COLORS.text },
  emptyText: { textAlign: "center", marginTop: 40, fontSize: 16, color: COLORS.gray },
});

export default OrderHistoryScreen;
