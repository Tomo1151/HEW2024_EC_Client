"use client";

import { useContext, useState, createContext } from "react";

import { fetchBaseURL, fetchHeaders } from "@/config/fetchConfig";

export const AuthContext = createContext({
  activeUser: null,
  login: () => {},
  logout: () => {},
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(null);

  const login = async (email, password) => {
    if (!email || !password) {
      return {
        success: false,
        message: "メールアドレスまたはパスワードが入力されていません",
      };
    }

    const response = await fetch(fetchBaseURL + "/auth/login", {
      method: "POST",
      headers: fetchHeaders,
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const resJson = await response.json();

    if (!resJson.success) {
      return {
        success: false,
        message: "メールアドレスまたはパスワードが違います",
      };
    }

    setActiveUser(resJson.data);

    return {
      success: true,
      message: "Logged in successfully as " + resJson.data.username,
    };
  };

  const logout = async () => {
    const response = await fetch(fetchBaseURL + "/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setActiveUser(null);
    console.log("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ activeUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
