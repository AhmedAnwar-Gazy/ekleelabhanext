import React, { createContext, useContext, useReducer, useEffect } from "react";
import { cartAPI } from "../lib/api/cart";

const AppContext = createContext();

const initialState = {
  cart: {
    items: [],
    total: 0,
    count: 0,
  },
  wishlist: [],
  user: null,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [...state.cart.items, action.payload],
          count: state.cart.count + action.payload.quantity,
        },
      };
    case "UPDATE_CART_ITEM":
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.map((item) =>
            item.id === action.payload.id ? action.payload : item
          ),
        },
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.filter((item) => item.id !== action.payload),
          count: state.cart.count - 1,
        },
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: initialState.cart,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};4

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // تحميل السلة عند بدء التطبيق
  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await cartAPI.getCart();
        dispatch({ type: "SET_CART", payload: cartData });
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    };

    const token = localStorage.getItem("access_token");
    if (token) {
      loadCart();
    }
  }, []);

  const value = {
    state,
    dispatch,
    // وظائف مساعدة
    addToCart: async (productId, quantity = 1) => {
      try {
        const response = await cartAPI.addToCart(productId, quantity);
        dispatch({ type: "ADD_TO_CART", payload: response });
        return response;
      } catch (error) {
        throw error;
      }
    },
    removeFromCart: async (itemId) => {
      try {
        await cartAPI.removeFromCart(itemId);
        dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
      } catch (error) {
        throw error;
      }
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
