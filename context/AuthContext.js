"use client";

import { useContext, useState, createContext, useEffect } from "react";

import { fetchBaseURL, fetchHeaders } from "@/config/fetchConfig";

export const AuthContext = createContext({
  activeUser: null,
  signin: () => {},
  login: () => {},
  logout: () => {},
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(null);

  const fetchUser = async () => {
    const response = await fetch(fetchBaseURL + "/auth/fetch", {
      method: "POST",
      headers: fetchHeaders,
      credentials: "include",
    });

    const resJson = await response.json();

    if (!resJson.success) {
      await logout();
    }
  };

  const signin = async (username, email, password) => {
    if (!username || !email || !password) {
      return {
        success: false,
        message: "空の入力項目があります",
      };
    }

    const response = await fetch(fetchBaseURL + "/auth/register", {
      method: "POST",
      headers: fetchHeaders,
      body: JSON.stringify({ username, email, password }),
      credentials: "include",
    });

    const resJson = await response.json();

    if (!resJson.success) {
      return {
        success: false,
        message: "ユーザー名またはメールアドレスが既に登録されています",
      };
    }

    return {
      success: true,
      message: "Signed in successfully as " + resJson.data.username,
    };
  };

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

  const refreshToken = async () => {
    const response = await fetch(fetchBaseURL + "/auth/refresh", {
      method: "POST",
      headers: fetchHeaders,
      credentials,
    });
    const resJson = await response.json();
    if (!resJson.success) {
      await logout();
    }
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
    <AuthContext.Provider value={{ activeUser, signin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
