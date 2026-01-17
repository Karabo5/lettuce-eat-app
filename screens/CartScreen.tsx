import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Platform,
} from "react-native";
import { COLORS } from "../theme/colors";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const CartScreen = ({ navigation }: any) => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const { user } = useAuth();

  const isEmpty = cartItems.length === 0;

  const handleCheckout = () => {
    if (!user) {
      if (Platform.OS === "web") {
        const login = window.confirm(
          "You must login or register to place your order.\n\nClick OK to Login, Cancel to Register."
        );
        if (login) navigation.navigate("Login");
        else navigation.navigate("Register");
        return;
      }

      Alert.alert(
        "Login Required",
        "You must register or login to place your order.",
        [
          { text: "Cancel" },
          { text: "Login", onPress: () => navigation.navigate("Login") },
          { text: "Register", onPress: () => navigation.navigate("Register") },
        ]
      );
      return;
    }

    navigation.navigate("Checkout");
  };

  const renderItem = ({ item }: any) => {
    const extrasTotal = item.extras
      ? item.extras.reduce((sum: number, e: any) => sum + e.price, 0)
      : 0;

    const totalPrice = (item.price + extrasTotal) * item.quantity;

    return (
      <View style={styles.card}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>

          {item.extras && item.extras.length > 0 && (
            <Text style={styles.extras}>
              Extras: {item.extras.map((e: any) => e.name).join(", ")}
            </Text>
          )}

          <Text style={styles.price}>R {totalPrice.toFixed(2)}</Text>

          <View style={styles.quantityRow}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.quantityNumber}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromCart(item.id)}
        >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const cartTotal = cartItems.reduce((sum, item) => {
    const extrasTotal = item.extras
      ? item.extras.reduce((s, e) => s + e.price, 0)
      : 0;
    return sum + (item.price + extrasTotal) * item.quantity;
  }, 0);

  return (
    <ImageBackground
      source={
        isEmpty
          ? {
              uri: "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg",
            }
          : undefined
      }
      style={styles.container}
      resizeMode="cover"
    >
      {isEmpty && <View style={styles.overlay} />}

      {isEmpty ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Your cart is empty 🛒</Text>
          <Text style={styles.emptyText}>
            Add some delicious meals to get started
          </Text>

          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate("Tabs", { screen: "Menu" })}
          >
            <Text style={styles.browseText}>Browse Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 140 }}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Total: R {cartTotal.toFixed(2)}</Text>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
              <Text style={styles.clearText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  name: { fontSize: 18, fontWeight: "700", color: COLORS.text },
  extras: { fontSize: 14, color: COLORS.gray, marginVertical: 4 },
  price: { fontSize: 16, fontWeight: "600", color: COLORS.darkGreen },

  quantityRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  quantityButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  quantityText: { color: COLORS.white, fontSize: 18, fontWeight: "700" },
  quantityNumber: { fontSize: 16, fontWeight: "700", marginHorizontal: 12 },

  removeButton: { justifyContent: "center", paddingHorizontal: 10 },
  removeText: { color: COLORS.brown, fontWeight: "700" },

  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },

  total: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 10,
  },
  checkoutText: { color: COLORS.white, fontSize: 16, fontWeight: "600" },

  clearButton: {
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.brown,
    backgroundColor: "#fff4f0",
  },
  clearText: { color: COLORS.brown, fontWeight: "700", fontSize: 16 },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#eee",
    textAlign: "center",
    marginBottom: 20,
  },
  browseButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 30,
  },
  browseText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});

export default CartScreen;
