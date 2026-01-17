import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

export type MenuExtra = {
  id: string;
  name: string;
  price: number;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  extras: MenuExtra[];
};

type MenuContextType = {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, "id">) => Promise<void>;
  updateMenuItem: (item: MenuItem) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
};

const MenuContext = createContext<MenuContextType>({} as MenuContextType);

export const MenuProvider = ({ children }: any) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const loadMenu = async () => {
      const stored = await AsyncStorage.getItem("menuItems");
      if (stored) setMenuItems(JSON.parse(stored));
    };
    loadMenu();
  }, []);

  const saveMenuItems = async (items: MenuItem[]) => {
    setMenuItems(items);
    await AsyncStorage.setItem("menuItems", JSON.stringify(items));
  };

  const addMenuItem = async (item: Omit<MenuItem, "id">) => {
    const newItem: MenuItem = {
      ...item,
      id: uuidv4(),
      extras: item.extras.map(e => ({ ...e, id: e.id || uuidv4() })),
    };
    const updated = [...menuItems, newItem];
    await saveMenuItems(updated);
  };

  const updateMenuItem = async (updatedItem: MenuItem) => {
    const updated = menuItems.map((i) => (i.id === updatedItem.id ? updatedItem : i));
    await saveMenuItems(updated);
  };

  const deleteMenuItem = async (id: string) => {
    const updated = menuItems.filter((i) => i.id !== id);
    await saveMenuItems(updated);
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, updateMenuItem, deleteMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
