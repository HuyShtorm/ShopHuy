
import React, { createContext, useContext, useReducer, useEffect, useState,Alert } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export const AuthContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.find(item => item.id === action.payload.id);

      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    case 'DECREASE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 > 0 ? item.quantity - 1 : 0 } : item
      );
    case 'INCREASE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    case 'REMOVE_FROM_CART':
      alert('Xóa Thành Công');
      return state.filter(item => item.id !== action.payload.id);
      case 'SET_CART':
      return action.payload;

    default:
      return state;
  }
};
export const AuthProvider = ({ children }) => {
  const [currentUserType, setCurrentUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);

  const value = {
    currentUserType,
    setCurrentUserType,
    username,
    setUsername,
    password,
    setPassword,
    orders,
    setOrders,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
  
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart phải được sử dụng bên trong CartProvider');
  }

  return context;
};
  

// Trong CartContext.js
// Trong CartContext.js
export const CartProvider = ({ children }) => {
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [cart, dispatch] = useReducer(cartReducer, []);

  const fetchCartData = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        dispatch({ type: 'SET_CART', payload: JSON.parse(storedCart) });
      }
      setHasFetchedData(true);
    } catch (error) {
      console.error('Lỗi khi truy xuất giỏ hàng từ AsyncStorage:', error);
    }
  };

  useEffect(() => {
    if (!hasFetchedData) {
      fetchCartData();
    }
  }, [hasFetchedData]);

  useEffect(() => {
    const saveCartToStorage = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Lỗi khi lưu giỏ hàng vào AsyncStorage:', error);
      }
    };

    saveCartToStorage();
  }, [cart]);

  const value = {
    cart,
    dispatch,
  };

  return (
    <CartContext.Provider value={value}>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </CartContext.Provider>
  );
};

