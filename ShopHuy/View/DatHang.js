import React, { useContext, useLayoutEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useCart } from './CartContext';
import AuthService from './AuthService';


const DatHang = ({ navigation }) => {
    
    const { cart } = useCart();

const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);



  const handleLogout = () => {
    // Thực hiện các bước đăng xuất tại đây
    // Ví dụ, có thể đặt lại dữ liệu người dùng, xóa token, vv.
    // Trong trường hợp này, đặt kiểu người dùng hiện tại trong AuthService về rỗng.
    AuthService.currentUserType = '';

    // Chuyển về màn hình đăng nhập hoặc trang chủ, tùy thuộc vào logic của bạn.
    navigation.navigate('DangNhap');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: null, // Ẩn nút quay lại
      headerRight: () => (
        <Button title="Đăng Xuất" onPress={handleLogout} />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trang Đặt Hàng</Text>
      <Text style={styles.subheader}>Danh sách vật phẩm:</Text>
      {cart.map((item, index) => (
  <View key={index} style={styles.item}>
    <Text>{item.name}</Text>
    <Text>{item.price} VNĐ</Text>
  </View>
))}

      <Text style={styles.total}>Tổng cộng: {total} VNĐ</Text>
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
  subheader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  // Các kiểu khác nếu cần
});

export default DatHang;
