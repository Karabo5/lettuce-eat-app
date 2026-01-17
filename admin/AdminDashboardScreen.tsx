import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  Dimensions,
} from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { useOrders } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import { COLORS } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";

const screenWidth = Dimensions.get("window").width;

const AdminDashboard = () => {
  const { orders } = useOrders();
  const { user, updateUser, logout } = useAuth();
  const navigation = useNavigation<any>();

  const [name, setName] = useState(user?.name || "");
  const [surname, setSurname] = useState(user?.surname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const pendingOrders = orders.filter(o => o.status === "Pending").length;
  const deliveredOrders = orders.filter(o => o.status === "Delivered").length;
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

  const barData = {
    labels: ["Pending", "Delivered"],
    datasets: [{ data: [pendingOrders, deliveredOrders] }],
  };

  const pieData = [
    {
      name: "Pending",
      population: pendingOrders,
      color: COLORS.brown,
      legendFontColor: COLORS.text,
      legendFontSize: 14,
    },
    {
      name: "Delivered",
      population: deliveredOrders,
      color: COLORS.primary,
      legendFontColor: COLORS.text,
      legendFontSize: 14,
    },
  ];

  const showMessage = (title: string, message: string) => {
    if (Platform.OS === "web") window.alert(`${title}\n\n${message}`);
    else Alert.alert(title, message);
  };

  const handleUpdateProfile = async () => {
    if (!name || !surname || !email) {
      showMessage("Error", "Name, surname and email are required");
      return;
    }

    try {
      await updateUser({ ...user!, name, surname, email, phone });
      showMessage("Success", "Profile updated successfully");
    } catch (err: any) {
      showMessage("Error", err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigation.replace("AdminPage");
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Feather name="log-out" size={38} color={COLORS.darkGreen} />
      </TouchableOpacity>

      <Text style={styles.title}>Admin Dashboard</Text>

      <Text style={styles.subtitle}>Order Status Overview</Text>
      <BarChart
        data={barData}
        width={screenWidth - 32}
        height={220}
        yAxisLabel="R "
        yAxisSuffix=""
        fromZero
        chartConfig={{
          backgroundGradientFrom: COLORS.background,
          backgroundGradientTo: COLORS.background,
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(123, 174, 62, ${opacity})`,
          labelColor: () => COLORS.text,
        }}
        style={{ marginVertical: 8, borderRadius: 16 }}
      />

      <Text style={styles.subtitle}>Orders Distribution</Text>
      <PieChart
        data={pieData}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          backgroundGradientFrom: COLORS.background,
          backgroundGradientTo: COLORS.background,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
          labelColor: () => COLORS.text,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <Text style={styles.subtitle}>
        Total Sales: R {totalSales.toFixed(2)}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AdminMenu")}
      >
        <Text style={styles.buttonText}>Manage Menu</Text>
      </TouchableOpacity>

      <Text style={[styles.subtitle, { marginTop: 24 }]}>Update Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Surname"
        value={surname}
        onChangeText={setSurname}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.background },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 16, textAlign: "center" },
  subtitle: { fontSize: 20, fontWeight: "600", marginTop: 16, marginBottom: 8 },
  input: {
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: { color: COLORS.white, fontWeight: "700", fontSize: 16 },
  logoutButton: {
    position: "absolute",
    top: 56,
    right: 16,
    zIndex: 10,
  },
});

export default AdminDashboard;
