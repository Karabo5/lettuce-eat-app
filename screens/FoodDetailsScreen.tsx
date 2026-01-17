import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { COLORS } from "../theme/colors";
import { useCart, CartExtra, CartItem } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { MenuExtra } from "@/context/MenuContext";

type FoodDetailsScreenProps = {
  route: {
    params: {
      item: {
        id: string;
        name: string;
        description: string;
        price: number;
        image: string;
        extras?: CartExtra[];
      };
    };
  };
  navigation: any;
};

const showAlert = (title: string, message: string) => {
  if (Platform.OS === "web") {
    window.alert(`${title}\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

const FoodDetailsScreen = ({ route, navigation }: FoodDetailsScreenProps) => {
  const { item } = route.params;
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [selectedExtras, setSelectedExtras] = useState<CartExtra[]>([]);
  const [quantity, setQuantity] = useState(1);

  const toggleExtra = (extra: CartExtra) => {
    if (selectedExtras.find((e) => e.name === extra.name)) {
      setSelectedExtras((prev) => prev.filter((e) => e.name !== extra.name));
    } else {
      setSelectedExtras((prev) => [...prev, extra]);
    }
  };

  const getTotalPrice = () => {
    const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
    return (item.price + extrasTotal) * quantity;
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      price: item.price + selectedExtras.reduce((sum, e) => sum + e.price, 0),
      quantity,
      extras: selectedExtras,
    };
    addToCart(cartItem);
    showAlert("Success", "Item added to cart");
    navigation.navigate("Tabs", { screen: "Menu" });
  };

  const handleCheckout = () => {
    if (!user) {
      if (Platform.OS === "web") {
        const login = window.confirm(
          "You must login or register to proceed to checkout. Click OK to Login, Cancel to Register."
        );
        if (login) navigation.navigate("Login");
        else navigation.navigate("Register");
        return;
      }

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

    navigation.navigate("Tabs", { screen: "Cart" });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>R {item.price.toFixed(2)}</Text>

      {item.extras && item.extras.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extras:</Text>
          {item.extras.map((extra: CartExtra) => (
            <TouchableOpacity
              key={extra.name}
              style={[
                styles.extraItem,
                selectedExtras.find((e) => e.name === extra.name)
                  ? styles.extraSelected
                  : {},
              ]}
              onPress={() => toggleExtra(extra)}
            >
              <Text style={styles.extraText}>
                {extra.name} (+R {extra.price})
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quantity:</Text>
        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.totalPrice}>
        Total: R {getTotalPrice().toFixed(2)}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: COLORS.brown }]}
        onPress={handleCheckout}
      >
        <Text style={styles.buttonText}>Go to Checkout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: COLORS.background },
  image: { width: "100%", height: 200, borderRadius: 16, marginBottom: 16 },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },
  description: { fontSize: 16, color: COLORS.gray, marginBottom: 8 },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 16,
  },
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: COLORS.text,
  },
  extraItem: {
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  extraSelected: {
    borderColor: COLORS.primary,
    backgroundColor: "#E6F2D8",
  },
  extraText: { fontSize: 16, color: COLORS.text },
  quantityRow: { flexDirection: "row", alignItems: "center" },
  qtyButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  qtyText: { fontSize: 18, fontWeight: "700", color: COLORS.white },
  quantity: { fontSize: 18, fontWeight: "700", marginHorizontal: 20 },
  totalPrice: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: COLORS.primary,
  },
  button: {
    paddingVertical: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: { color: COLORS.white, fontSize: 16, fontWeight: "700" },
});

export default FoodDetailsScreen;
