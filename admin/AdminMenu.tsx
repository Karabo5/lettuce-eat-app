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
} from "react-native";
import { COLORS } from "../theme/colors";
import { useMenu, MenuItem, MenuExtra } from "@/context/MenuContext";
import { v4 as uuidv4 } from "uuid";
import { Picker } from "@react-native-picker/picker";

const categories = ["Main Dishes", "Desserts", "Drinks", "Sides"];

const AdminMenu = () => {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu();

  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [extras, setExtras] = useState<MenuExtra[]>([]);

  const showMessage = (title: string, message: string) => {
    if (Platform.OS === "web") window.alert(`${title}\n\n${message}`);
    else Alert.alert(title, message);
  };

  const resetForm = () => {
    setEditingItem(null);
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setImage("");
    setExtras([]);
  };

  const handleSubmit = async () => {
    if (!name || !description || !price || !category || !image) {
      showMessage("Error", "All fields are required");
      return;
    }

    const item: Omit<MenuItem, "id"> = {
      name,
      description,
      price: parseFloat(price),
      category,
      image,
      extras: extras.map((e) => ({ ...e, id: e.id || uuidv4() })),
    };

    try {
      if (editingItem) {
        await updateMenuItem({ ...item, id: editingItem.id });
        showMessage("Success", "Menu item updated");
      } else {
        await addMenuItem(item);
        showMessage("Success", "Menu item added");
      }
      resetForm();
    } catch (err: any) {
      showMessage("Error", err.message);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price.toString());
    setCategory(item.category);
    setImage(item.image);
    setExtras(item.extras || []);
  };

  const handleDelete = async (id: string) => {
    Alert.alert("Confirm Delete", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          await deleteMenuItem(id);
          showMessage("Deleted", "Menu item removed");
        },
        style: "destructive",
      },
    ]);
  };

  const addExtra = () => setExtras([...extras, { id: uuidv4(), name: "", price: 0 }]);

  const updateExtra = (id: string, field: "name" | "price", value: string) => {
    setExtras((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, [field]: field === "price" ? parseFloat(value) || 0 : value }
          : e
      )
    );
  };

  const removeExtra = (id: string) => setExtras((prev) => prev.filter((e) => e.id !== id));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{editingItem ? "Edit Menu Item" : "Add Menu Item"}</Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Price"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Picker
        selectedValue={category}
        onValueChange={(value) => setCategory(value)}
        style={styles.picker}
      >
        <Picker.Item label="Select Category" value="" />
        {categories.map((cat) => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>

      <TextInput
        placeholder="Image URL"
        style={styles.input}
        value={image}
        onChangeText={setImage}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{editingItem ? "Update" : "Add"} Item</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { marginTop: 24 }]}>Existing Menu</Text>
      {menuItems.map((item) => (
        <View key={item.id} style={styles.menuItem}>
          <Text style={{ fontWeight: "700" }}>{item.name} - R {item.price.toFixed(2)}</Text>
          <Text>{item.category}</Text>
          <View style={{ flexDirection: "row", marginTop: 4 }}>
            <TouchableOpacity onPress={() => handleEdit(item)} style={styles.smallButton}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.smallButton, { backgroundColor: "red" }]}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.background },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  input: { backgroundColor: COLORS.white, padding: 12, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: "#ddd" },
  picker: { backgroundColor: COLORS.white, borderRadius: 12, marginBottom: 12 },
  button: { backgroundColor: COLORS.primary, padding: 14, borderRadius: 30, alignItems: "center", marginBottom: 16 },
  buttonText: { color: COLORS.white, fontWeight: "700" },
  extraRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  menuItem: { backgroundColor: COLORS.white, padding: 12, borderRadius: 12, marginBottom: 12 },
  smallButton: { backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 8 },
});

export default AdminMenu;
