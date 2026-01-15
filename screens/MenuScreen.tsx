import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLORS } from "../theme/colors";
import { foods } from "@/data/food"; 

const MenuScreen = ({ navigation }: any) => {
  const groupedFoods = foods.reduce((acc: any, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Menu</Text>

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
                onPress={() =>
                  navigation.navigate("FoodDetails", { item })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                />

                <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>R {item.price}</Text>
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
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: COLORS.text,
  },
  section: {
    marginBottom: 32,
  },
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
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 140,
  },
  info: {
    padding: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  price: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.darkGreen,
  },
});

export default MenuScreen;
