import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ImageBackground,
} from "react-native";
import { COLORS } from "../theme/colors";
import { useAuth, User } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }: any) => {
  const { user, updateUser, logout } = useAuth(); 
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!user) return;

    setName(user.name);
    setSurname(user.surname);
    setEmail(user.email);
    setPhone(user.phone);
    setAddress(user.address);
    setCardName(user.cardName || "");
    setCardNumber(user.cardNumber || "");
    setExpiry(user.expiry || "");
    setCvv(user.cvv || "");
    setPassword(user.password);
  }, [user]);

  const handleUpdate = () => {
    if (!name || !surname || !email || !phone || !address) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }

    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert("Error", "Phone must be 10–15 digits");
      return;
    }

    if (cardNumber) {
      const cardRegex = /^\d{16}$/;
      if (!cardRegex.test(cardNumber.replace(/\s/g, ""))) {
        Alert.alert("Error", "Card number must be 16 digits");
        return;
      }
    }

    if (expiry) {
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!expiryRegex.test(expiry)) {
        Alert.alert("Error", "Expiry must be MM/YY format");
        return;
      }
    }

    if (cvv) {
      const cvvRegex = /^\d{3}$/;
      if (!cvvRegex.test(cvv)) {
        Alert.alert("Error", "CVV must be 3 digits");
        return;
      }
    }

    const updatedUser: User = {
      name,
      surname,
      email,
      phone,
      address,
      cardName,
      cardNumber,
      expiry,
      cvv,
      password,
    };

    updateUser(updatedUser);
    Alert.alert("Success", "Profile updated successfully");
  };

  if (!user) {
    return (
      <ImageBackground
        source={{ uri: "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg" }}
        style={styles.container}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.lockedTitle}>Login Required 🔒</Text>
          <Text style={styles.lockedText}>You must be logged in to view your profile.</Text>
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginText}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>My Profile</Text>

      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Surname" value={surname} onChangeText={setSurname} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />

      <Text style={styles.sectionTitle}>Card Details (Optional)</Text>
      <TextInput style={styles.input} placeholder="Cardholder Name" value={cardName} onChangeText={setCardName} />
      <TextInput style={styles.input} placeholder="Card Number" value={cardNumber} onChangeText={setCardNumber} keyboardType="numeric" />
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.halfInput]} placeholder="MM/YY" value={expiry} onChangeText={setExpiry} keyboardType="numeric" />
        <TextInput style={[styles.input, styles.halfInput]} placeholder="CVV" value={cvv} onChangeText={setCvv} keyboardType="numeric" />
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color={COLORS.gray} style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FF4D4D" }]}
        onPress={() => {
          logout();
          navigation.navigate("Menu");
        }}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: COLORS.background },
  overlay: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  lockedTitle: { fontSize: 28, fontWeight: "700", color: COLORS.white, marginBottom: 12 },
  lockedText: { fontSize: 18, color: COLORS.white, textAlign: "center", marginBottom: 20 },
  loginButton: { backgroundColor: COLORS.primary, paddingVertical: 14, paddingHorizontal: 30, borderRadius: 25 },
  loginText: { color: COLORS.white, fontWeight: "700", fontSize: 16 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20, color: COLORS.text },
  input: { backgroundColor: COLORS.white, borderRadius: 12, padding: 14, fontSize: 16, marginBottom: 16, borderWidth: 1, borderColor: "#ddd" },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12, color: COLORS.text, marginTop: 10 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  halfInput: { width: "48%" },
  button: { backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 30, alignItems: "center", marginTop: 20, marginBottom: 30 },
  buttonText: { color: COLORS.white, fontSize: 16, fontWeight: "600" },
  passwordContainer: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
});

export default ProfileScreen;
