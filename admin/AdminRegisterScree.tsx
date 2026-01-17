import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { useAuth } from "@/context/AuthContext";
import { COLORS } from "../theme/colors";

const AdminRegisterScreen = ({ navigation }: any) => {
  const { register, users } = useAuth();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showMessage = (title: string, message: string) => {
    if (Platform.OS === "web") window.alert(`${title}\n\n${message}`);
    else Alert.alert(title, message);
  };

  const handleRegister = async () => {
    if (!name || !surname || !email || !password) {
      showMessage("Error", "All fields are required");
      return;
    }

    if (password.length < 6) {
      showMessage("Error", "Password must be at least 6 characters");
      return;
    }

    if (!email.toLowerCase().includes("admin")) {
      showMessage("Invalid Email", "Admin email must include 'admin'");
      return;
    }

    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      showMessage("Error", "Email already registered");
      return;
    }

    try {
      await register({
        name,
        surname,
        email,
        password,
        role: "admin",
        phone: "",
        address: "",
      });
      showMessage("Success", "Admin registered successfully");
      navigation.navigate("AdminLogin");
    } catch (err: any) {
      showMessage("Registration Failed", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Registration</Text>

      <TextInput
        placeholder="First Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Surname"
        style={styles.input}
        value={surname}
        onChangeText={setSurname}
      />
      <TextInput
        placeholder="Enter email (user@admin.com)"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("AdminLogin")}>
        <Text style={styles.linkText}>
          Already have an account? <Text style={styles.link}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  title: { fontSize: 28, fontWeight: "700", textAlign: "center", marginBottom: 24 },
  input: {
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: { color: COLORS.white, fontWeight: "700", fontSize: 16 },
  linkText: { textAlign: "center", color: COLORS.gray },
  link: { color: COLORS.darkGreen, fontWeight: "600" },
});

export default AdminRegisterScreen;
