import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type User = {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  cardName?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  role?: "user" | "admin";
};

type AuthContextType = {
  user: User | null;
  users: User[];
  register: (user: User) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updatedUser: User) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const usersJSON = await AsyncStorage.getItem("users");
      const currentUserJSON = await AsyncStorage.getItem("user");
      if (usersJSON) setUsers(JSON.parse(usersJSON));
      if (currentUserJSON) setUser(JSON.parse(currentUserJSON));
    };
    loadData();
  }, []);

  const saveUsers = async (newUsers: User[]) => {
    setUsers(newUsers);
    await AsyncStorage.setItem("users", JSON.stringify(newUsers));
  };

  const saveUser = async (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
    } else {
      await AsyncStorage.removeItem("user");
    }
  };

  const register = async (newUser: User) => {
    if (users.some((u) => u.email === newUser.email)) {
      throw new Error("Email already registered");
    }
    if (!newUser.role) newUser.role = "user";
    const updatedUsers = [...users, newUser];
    await saveUsers(updatedUsers);
    await saveUser(newUser);
  };

  const login = async (email: string, password: string) => {
    const found = users.find((u) => u.email === email);
    if (!found) throw new Error("Email not registered");
    if (found.password !== password) throw new Error("Incorrect password");
    await saveUser(found);
  };

  const logout = async () => {
    await saveUser(null);
  };

  const updateUser = async (updatedUser: User) => {
    const updatedUsers = users.map((u) =>
      u.email === updatedUser.email ? updatedUser : u
    );
    await saveUsers(updatedUsers);
    await saveUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, users, register, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
