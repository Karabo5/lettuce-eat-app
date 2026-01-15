import React from "react";
import { useAuth } from "@/context/AuthContext";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const AppNavigator = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <AppStack /> : <AuthStack />;
};

export default AppNavigator;
