import React, { useLayoutEffect } from 'react'; // Import useLayoutEffect
import { View, Text, StyleSheet, Button, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HoanThanh = ({ route }) => {
  const { orderDetails } = route.params;
  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.navigate('TrangChu');
  };

  const navigateToUserInfo = () => {
    try {
      navigation.navigate('ThongTinNguoiDung');
    } catch (error) {
      console.error('Lỗi điều hướng:', error);
    }
  };
  

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: null,
      headerRight: () => (
        <View style={styles.headerRight}>
          <Pressable onPress={navigateToUserInfo}>
            <Image style={styles.icon} source={require('../img/user.png')} />
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đơn Hàng Đã Đặt</Text>
      <View style={styles.orderDetails}>
        <Text style={styles.detailLabel}>Sản phẩm:</Text>
        {orderDetails.cart.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.price} VNĐ</Text>
          </View>
        ))}
        <Text style={styles.detailLabel}>Tổng cộng:</Text>
        <Text>{orderDetails.total} VNĐ</Text>
        <Text style={styles.detailLabel}>Địa chỉ giao hàng:</Text>
        <Text>{orderDetails.address}</Text>
        <Text style={styles.detailLabel}>Phương thức thanh toán:</Text>
        <Text>{orderDetails.paymentMethod}</Text>
        <Text style={styles.detailLabel}>Phương thức vận chuyển:</Text>
        <Text>{orderDetails.shippingMethod}</Text>
      </View>

      {/* Button to navigate to home */}
      <Button title="Quay về Trang Chủ" onPress={navigateToHome} />
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
  orderDetails: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#F93409',
    marginRight: 8,
  },
});

export default HoanThanh;
