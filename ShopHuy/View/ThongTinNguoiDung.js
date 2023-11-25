import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button, Pressable, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './CartContext';
import { useNavigation, StackActions } from '@react-navigation/native';
import AuthService from './AuthService';

const ThongTinNguoiDung = () => {
  const { username, password, orders, setOrders } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    console.log('Logging out...'); // Add this line
    AuthService.currentUserType = '';
    navigation.dispatch(StackActions.replace('DangNhap'));
  };

  const navigateToCart = () => {
    navigation.navigate('GioHang');
  };

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null, // Ẩn nút quay lại
      headerRight: () => (
        <View style={styles.headerRight}>
          <Pressable onPress={navigateToCart}>
            <Image style={styles.icon} source={require('../img/shop.png')} />
          </Pressable>
          <Button title="Đăng Xuất" onPress={handleLogout} />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thông Tin Người Dùng</Text>
      <Text>Tài khoản: {username}</Text>
      <Text>Mật khẩu: {password}</Text>

      <Text style={styles.ordersHeader}>Đơn Hàng Đã Đặt:</Text>
      {orders && orders.length > 0 ? (
        orders.map((order, index) => (
          <View key={index}>
            <Text>Đơn hàng #{index + 1}</Text>
            {/* Hiển thị các thông tin đơn hàng khác tùy ý */}
          </View>
        ))
      ) : (
        <Text>Không có đơn hàng nào.</Text>
      )}
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    // Điều chỉnh khoảng cách nút đăng xuất so với đỉnh màn hình
  },
  logoutButtonContainer: {
    backgroundColor: '#F93409',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 16,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#F93409',
    marginRight: 8,
  },
});

export default ThongTinNguoiDung;
