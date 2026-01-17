import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { COLORS } from "../theme/colors";
import { foods } from "@/data/food";

const MenuScreen = ({ navigation }: any) => {
  const groupedFoods = foods.reduce((acc: any, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg",
        }}
        style={styles.headerImage}
        imageStyle={{ opacity: 0.6 }}
      >
        <TouchableOpacity
          style={styles.adminButton}
          onPress={() => navigation.navigate("AdminPage")}
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            style={styles.adminIcon}
          />
          <Text style={styles.adminText}>Admin</Text>
        </TouchableOpacity>

        <Text style={styles.logo}>LettUce🍃 {"\n"} Eat!</Text>
        <Text style={styles.tagline}>
          <Text style={styles.highlight}>LettUce{"\n"}</Text>
          <Text style={{ color: COLORS.text }}>Feed Your </Text>
          <Text style={{ color: COLORS.brown }}>Cravings!</Text>
        </Text>
      </ImageBackground>

      {Object.keys(groupedFoods).map((category) => (
        <View key={category} style={styles.section}>
          <Text style={styles.categoryTitle}>{category}</Text>

          <FlatList
            data={groupedFoods[category]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("FoodDetails", { item })}
              >
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.description} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate("FoodDetails", { item })}
                  >
                    <Text style={styles.addButtonText}>View / Add</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  headerImage: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
  },
  tagline: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
    marginTop: 10,
  },
  highlight: { color: COLORS.darkGreen },
  section: { marginBottom: 32, paddingHorizontal: 24 },
  categoryTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    color: COLORS.text,
  },
  card: {
    width: 220,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginRight: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: { width: "100%", height: 140 },
  info: { padding: 14 },
  name: { fontSize: 16, fontWeight: "600", color: COLORS.text },
  description: { fontSize: 14, color: "#666", marginVertical: 4 },
  price: { marginTop: 4, fontSize: 15, fontWeight: "700", color: COLORS.darkGreen },
  addButton: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  addButtonText: { color: COLORS.white, fontWeight: "600" },

  // Admin Icon
  adminButton: {
    position: "absolute",
    top: 44,
    right: 16,
    alignItems: "center",
  },
  adminIcon: { width: 36, height: 38, marginBottom: 2 },
  adminText: { fontSize: 12, color: COLORS.darkGreen, fontWeight: "800" },
});

export default MenuScreen;
