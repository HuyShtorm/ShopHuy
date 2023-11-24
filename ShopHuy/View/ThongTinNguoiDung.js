// ThongTinNguoiDung.js
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './CartContext';

const ThongTinNguoiDung = () => {
    const { username, password, orders } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedOrders = await AsyncStorage.getItem('orders');
        if (storedOrders) {
          setOrders(JSON.parse(storedOrders));
        }
      } catch (error) {
        console.error('Lỗi khi truy xuất thông tin người dùng từ AsyncStorage:', error);
      }
    };

    fetchUserData();
  }, []); // Chỉ gọi một lần khi component được mount

  useEffect(() => {
    const saveOrdersToStorage = async () => {
      try {
        await AsyncStorage.setItem('orders', JSON.stringify(orders));
      } catch (error) {
        console.error('Lỗi khi lưu đơn hàng vào AsyncStorage:', error);
      }
    };

    saveOrdersToStorage();
  }, [orders]); // Lưu lại đơn hàng mỗi khi thay đổi danh sách đơn hàng

  if (!orders) {
    return <Text>Không có đơn hàng nào.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thông Tin Người Dùng</Text>
      <Text>Tài khoản: {username}</Text>
      <Text>Mật khẩu: {password}</Text>

      <Text style={styles.ordersHeader}>Đơn Hàng Đã Đặt:</Text>
      {orders.map((order, index) => (
        <View key={index}>
          <Text>Đơn hàng #{index + 1}</Text>
          {/* Hiển thị các thông tin đơn hàng khác tùy ý */}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  ordersHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  orderItem: {
    marginBottom: 8,
  },
});

export default ThongTinNguoiDung;
