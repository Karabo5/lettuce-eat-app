import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { COLORS } from "../theme/colors";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";

const CheckoutScreen = ({ navigation }: any) => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrders();

  const [address, setAddress] = useState(user?.address || "");
  const [cardName, setCardName] = useState(user?.cardName || "");
  const [cardNumber, setCardNumber] = useState(user?.cardNumber || "");
  const [expiry, setExpiry] = useState(user?.expiry || "");
  const [cvv, setCvv] = useState(user?.cvv || "");
  const [useSavedCard, setUseSavedCard] = useState(!!user?.cardNumber);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const generateId = () => Date.now().toString() + Math.floor(Math.random() * 10000);

  const handlePlaceOrder = () => {
    if (!user) {
      Alert.alert(
        "Login Required",
        "You must register or login to proceed to checkout",
        [
          { text: "Cancel" },
          { text: "Login", onPress: () => navigation.navigate("Login") },
          { text: "Register", onPress: () => navigation.navigate("Register") },
        ]
      );
      return;
    }

    if (!address || !cardName || !cardNumber || !expiry || !cvv) {
      Alert.alert("Error", "Please fill in all required payment fields");
      return;
    }

    const order = {
      id: generateId(),
      items: cartItems,
      total,
      date: new Date().toLocaleString(),
      status: "Pending" as const,
      address,
      paymentCard: cardNumber,
      userEmail: user.email,
    };

    addOrder(order);
    clearCart();
    Alert.alert("Success", "Your order has been placed!");
    navigation.navigate("Tabs", { screen: "Menu" });
  };

  const maskedCard = cardNumber ? "**** **** **** " + cardNumber.slice(-4) : "";

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Checkout</Text>

      <Text style={styles.sectionTitle}>Delivery Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.sectionTitle}>Payment</Text>

      {useSavedCard && maskedCard ? (
        <View style={styles.savedCardContainer}>
          <Text style={styles.savedCardText}>Using saved card: {maskedCard}</Text>
          <TouchableOpacity
            onPress={() => setUseSavedCard(false)}
            style={styles.editButton}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Cardholder Name"
            value={cardName}
            onChangeText={setCardName}
          />
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="MM/YY"
              value={expiry}
              onChangeText={setExpiry}
              keyboardType="default"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="CVV"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
              secureTextEntry
            />
          </View>
        </>
      )}

      <Text style={styles.total}>Total: R {total.toFixed(2)}</Text>

      <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: COLORS.background },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20, color: COLORS.text },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
    color: COLORS.text,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  halfInput: { width: "48%" },
  total: { fontSize: 20, fontWeight: "700", marginVertical: 16, color: COLORS.primary },
  button: {
    paddingVertical: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: { color: COLORS.white, fontSize: 16, fontWeight: "700" },
  savedCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E6F2D8",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  savedCardText: { fontSize: 16, fontWeight: "600", color: COLORS.text },
  editButton: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: COLORS.primary, borderRadius: 20 },
  editButtonText: { color: COLORS.white, fontWeight: "600" },
});

export default CheckoutScreen;
