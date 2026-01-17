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
  Platform,
} from "react-native";
import { COLORS } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = ({ navigation }: any) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const showMessage = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showMessage("Error", "Please enter both email and password");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      showMessage("Error", "Please enter a valid email address");
      return;
    }

    try {
      await login(email, password);
      showMessage("Success", "Welcome back!");
      navigation.navigate("Tabs");
    } catch (error: any) {
      showMessage("Error", error.message);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>
        <Text style={styles.welcomeText}>Welcome </Text>
        <Text style={styles.backText}>Back</Text>
      </Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.linkText}>
          Don't have an account? <Text style={styles.link}>Register</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 24 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 24, textAlign: "center", marginTop: 20 },
  welcomeText: { color: COLORS.text },
  backText: { color: COLORS.primary },
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
  button: { backgroundColor: COLORS.primary, paddingVertical: 14, borderRadius: 30, alignItems: "center", marginTop: 10, marginBottom: 20 },
  buttonText: { color: COLORS.white, fontSize: 16, fontWeight: "600" },
  linkText: { textAlign: "center", color: COLORS.gray, marginBottom: 30 },
  link: { color: COLORS.darkGreen, fontWeight: "600" },
});

export default LoginScreen;
