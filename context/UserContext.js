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
  clearUserCart: () => {},
  contactForm: () => {},
  cartItems: [],
});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(null);
  const [cartItems, setCartItems] = useState(null);

  useEffect(() => {
    (async () => {
      // await refreshToken();
      await fetchUser();
      await fetchUserCart();
    })();
  }, []);

  const clearUserCart = async () => {
    // refreshToken().then(async () => {
    await refreshToken();
    const response = await fetch(
      process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/carts/items/clear",
      {
        method: "DELETE",
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

    setCartItems([]);

    return {
      success: true,
      message: "Cart cleared",
    };
    // });
  };

  const fetchUserCart = async () => {
    // refreshToken()
    // .then(async () => {
    await refreshToken();
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
    // })
    // .catch((err) => {
    // console.log("Error fetching cart items");
    // console.error(err);
    // });
  };

  const fetchUser = async () => {
    await refreshToken();
    const response = await fetch(
      process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/auth/refresh",
      {
        method: "POST",
        headers: fetchHeaders,
        credentials: "include",
      }
    ).catch((err) => {
      // console.error(err);
    });

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
    // if (activeUser === null || activeUser === false)
    // return { success: false, message: "You are not logged in" };

    const response = await fetch(
      process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/auth/refresh",
      {
        method: "POST",
        headers: fetchHeaders,
        credentials: "include",
      }
    );
    const resJson = await response.json();
    // console.log(resJson);
    if (!resJson.success) {
      await logout();
      // console.log("You are not logged in");
      // throw new Error("You are not logged in");
      return {
        success: false,
        message: "You are not logged in",
      };
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

  const contactForm = async (name, email, message) => {
    console.log(JSON.stringify({ name, email, message }));
    const response = await fetch(
      process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/contact",
      {
        method: "POST",
        body: JSON.stringify({ name, email, message }),
        headers: fetchHeaders,
      }
    );

    const resJson = await response.json();
    if (!resJson.success) {
      if (!name || !email || !message) {
        return {
          success: false,
          message: "入力項目が不足しています",
        };
      }
      return {
        success: false,
        message: "メールアドレスが正しくありません",
      };
    }

    return {
      success: true,
      message: "Message sent successflully",
    };
  };

  return (
    <UserContext.Provider
      value={{
        activeUser,
        cartItems,
        fetchUserCart,
        clearUserCart,
        signin,
        login,
        logout,
        refreshToken,
        contactForm,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
