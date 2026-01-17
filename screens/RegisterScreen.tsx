import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";

const RegisterScreen = ({ navigation }: any) => {
  const { register, users } = useAuth();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    if (
      !name ||
      !surname ||
      !email ||
      !password ||
      !contact ||
      !address ||
      !cardName ||
      !cardNumber ||
      !expiry ||
      !cvv
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Error",
        "Password must be at least 6 characters, include an uppercase letter, a number, and a special character"
      );
      return;
    }

    const cardRegex = /^\d{16}$/;
    if (!cardRegex.test(cardNumber.replace(/\s/g, ""))) {
      Alert.alert("Error", "Card number must be 16 digits");
      return;
    }

    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiry)) {
      Alert.alert("Error", "Expiry must be in MM/YY format");
      return;
    }

    const cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(cvv)) {
      Alert.alert("Error", "CVV must be 3 digits");
      return;
    }

    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(contact)) {
      Alert.alert("Error", "Contact number must be 10–15 digits");
      return;
    }

    if (users.some((user) => user.email === email)) {
      Alert.alert("Error", "Email already registered");
      return;
    }

    register({
      name,
      surname,
      email,
      password,
      phone: contact,
      address,
      cardName,
      cardNumber,
      expiry,
      cvv,
    });

    Alert.alert("Success", "Account created successfully");
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>
        <Text style={styles.createText}>Create </Text>
        <Text style={styles.accountText}>Account</Text>
      </Text>

      <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Surname" style={styles.input} value={surname} onChangeText={setSurname} />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          style={[styles.input, { flex: 1 }]}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color={COLORS.gray}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Contact Number"
        style={styles.input}
        value={contact}
        onChangeText={setContact}
        keyboardType="phone-pad"
      />
      <TextInput placeholder="Address" style={styles.input} value={address} onChangeText={setAddress} />
      <TextInput placeholder="Cardholder Name" style={styles.input} value={cardName} onChangeText={setCardName} />
      <TextInput
        placeholder="Card Number"
        style={styles.input}
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
      />

      <View style={styles.row}>
        <TextInput
          placeholder="MM/YY"
          style={[styles.input, styles.halfInput]}
          value={expiry}
          onChangeText={(text) => setExpiry(text.replace(/[^0-9/]/g, ""))}
          keyboardType="default"
          maxLength={5}
        />

        <TextInput
          placeholder="CVV"
          style={[styles.input, styles.halfInput]}
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>
          Already have an account? <Text style={styles.link}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 24 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 24, textAlign: "center", marginTop: 20 },
  createText: { color: COLORS.text },
  accountText: { color: COLORS.primary },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  passwordContainer: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  halfInput: { width: "48%" },
  button: { backgroundColor: COLORS.primary, paddingVertical: 14, borderRadius: 30, alignItems: "center", marginTop: 10, marginBottom: 20 },
  buttonText: { color: COLORS.white, fontSize: 16, fontWeight: "600" },
  linkText: { textAlign: "center", color: COLORS.gray, marginBottom: 30 },
  link: { color: COLORS.darkGreen, fontWeight: "600" },
});

export default RegisterScreen;
