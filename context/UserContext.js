"use client";

import { useContext, useState, createContext, useEffect } from "react";

import { fetchHeaders } from "@/config/fetchConfig";

export const UserContext = createContext({
  activeUser: null,
  signin: () => {},
  login: () => {},
  logout: () => {},
  refreshToken: () => {},
  fetchUserCart: () => {},
  cartItems: [],
});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(null);
  const [cartItems, setCartItems] = useState(null);

  useEffect(() => {
    fetchUser();
    fetchUserCart();
  }, []);

  const fetchUserCart = async () => {
    await fetch(process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/auth/refresh", {
      method: "POST",
      headers: fetchHeaders,
      credentials: "include",
    });

    const response = await fetch(
      process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/carts/items",
      {
        method: "GET",
        headers: fetchHeaders,
        credentials: "include",
      }
    );

    const resJson = await response.json();

    if (!resJson.success) {
      return {
        success: false,
        message: "You are not logged in",
      };
    }

    setCartItems(resJson.data);

    return {
      success: true,
      message: "Cart fetched",
      data: resJson.data,
    };
  };

  const fetchUser = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/auth/refresh",
      {
        method: "POST",
        headers: fetchHeaders,
        credentials: "include",
      }
    );

    const resJson = await response.json();

    if (!resJson.success) {
      // await logout();
      setActiveUser(false);
      return {
        success: false,
        message: "You are not logged in",
      };
    }
    setActiveUser(resJson.data);

    return {
      success: true,
      message: "Logged in successfully as " + resJson.data.username,
    };
  };

  const signin = async (username, email, password) => {
    if (!username || !email || !password) {
      return {
        success: false,
        message: "空の入力項目があります",
      };
    }

    const response = await fetch(
      process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/auth/register",
      {
        method: "POST",
        headers: fetchHeaders,
        body: JSON.stringify({ username, email, password }),
        credentials: "include",
      }
    );

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

    const response = await fetch(
      process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/auth/login",
      {
        method: "POST",
        headers: fetchHeaders,
        body: JSON.stringify({ email, password }),
        credentials: "include",
        cache: "no-cache",
      }
    );

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
    const response = await fetch(
      process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/auth/refresh",
      {
        method: "POST",
        headers: fetchHeaders,
        credentials: "include",
      }
    );
    const resJson = await response.json();
    if (!resJson.success) {
      await logout();
    }

    return {
      success: true,
      message: "Token refreshed",
    };
  };

  const logout = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/auth/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );
    setActiveUser(false);
    console.log("Logged out successfully");
  };

  return (
    <UserContext.Provider
      value={{
        activeUser,
        cartItems,
        fetchUserCart,
        signin,
        login,
        logout,
        refreshToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
