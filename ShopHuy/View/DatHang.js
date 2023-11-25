import React, { useContext, useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable, Image, TextInput, Picker,ScrollView } from 'react-native';
import { useCart } from './CartContext';
import AuthService from './AuthService';

const DatHang = ({ navigation }) => {
  const { cart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');

  const handlePlaceOrder = () => {
    // Thực hiện các bước đặt hàng ở đây
    // Ví dụ, gửi đơn hàng lên server, lưu vào cơ sở dữ liệu, vv.
    if (!address || !shippingMethod || !paymentMethod) {
   alert('Chưa nhập đầy đủ thông tin cần thiết');
      // Kiểm tra xem có thông tin địa chỉ, phương thức vận chuyển và thanh toán hay không
      // Nếu thiếu thông tin, bạn có thể hiển thị cảnh báo hoặc xử lý tùy ý
      return;
    }
    alert('Đặt hàng thành công');
    // Sau khi đặt hàng thành công, chuyển sang trang thông báo
    navigation.navigate('HoanThanh', {
      orderDetails: {
        cart,
        total,
        address,
        shippingMethod,
        paymentMethod,
      },
    });
  };

  const handleLogout = () => {
    AuthService.currentUserType = '';
    navigation.navigate('DangNhap');
  };
 const navigateToUserInfo = () => {
  try {
    navigation.navigate('ThongTinNguoiDung');
  } catch (error) {
    console.error('Lỗi điều hướng:', error);
  }
};
const navigateToCart = () => {
  navigation.navigate('GioHang'); // Thay 'TenManHinhGioHang' bằng tên màn hình giỏ hàng của bạn
};

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: null,
      headerRight: () => (
        <View style={styles.headerRight}>
           <Pressable onPress={navigateToCart}>
          <Image style={styles.icon} source={require('../img/shop.png')} />
        </Pressable>
        <Pressable onPress={navigateToUserInfo}>
          <Image style={styles.icon} source={require('../img/user.png')} />
        </Pressable>
        <Button title="Đăng Xuất" onPress={handleLogout} />
      </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trang Đặt Hàng</Text>
      <Text style={styles.subheader}>Danh sách sản phẩm:</Text>
      <ScrollView style={styles.cartList}>
      {cart.map((item, index) => (
        <View key={index} style={styles.item}>

          <Image source={{ uri: item.imageLocal }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>{item.price} VNĐ</Text>
              <Text>Số Lượng: {item.quantity}</Text>
          </View>
        </View>
      ))} </ScrollView>
      <Text style={styles.total}>Tổng cộng: {total} VNĐ</Text>

      {/* View địa chỉ */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Địa chỉ giao hàng:</Text>
        <TextInput
          style={styles.infoInput}
          placeholder="Nhập địa chỉ"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Chọn phương thức thanh toán:</Text>
        <Picker
          selectedValue={paymentMethod}
          style={styles.infoInput}
          onValueChange={(itemValue) => setPaymentMethod(itemValue)}
        >
          <Picker.Item label="Chọn phương thức thanh toán" value="" />
          <Picker.Item label="Thanh toán khi nhận hàng" value="COD" />
          <Picker.Item label="Chuyển khoản ngân hàng" value="Chuyển Khoản Trước" />
        </Picker>
      </View>

      {/* View phương thức vận chuyển */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Chọn phương thức vận chuyển:</Text>
        <Picker
          selectedValue={shippingMethod}
          style={styles.infoInput}
          onValueChange={(itemValue) => setShippingMethod(itemValue)}
        >
          <Picker.Item label="Chọn phương thức vận chuyển" value="" />
          <Picker.Item label="Vận chuyển nhanh" value="Nhanh" />
          <Picker.Item label="Vận chuyển tiết kiệm" value="Tiết Kiệm" />
        </Picker>
      </View>
    

      {/* View nút đặt hàng */}
      <View style={styles.bottomNavigation}>
        <Pressable onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderButton}>Đặt Hàng</Text>
        </Pressable>
      </View>
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
    alignItems: 'center',
    marginBottom: 8,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 8,
    borderRadius: 4,
  },
  itemDetails: {
    flexDirection: 'column',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#555', // Điều chỉnh màu sắc nếu cần
  },

  itemQuantity: {
    fontSize: 14,
    color: '#555', // Điều chỉnh màu sắc nếu cần
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  img3: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
   height:20,
    backgroundColor: '#F93409',
    position: 'absolute',
    bottom: 0,
  
  },
  placeOrderButton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
  infoContainer: {
    marginVertical: 12,
    
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
  },
  cartList: {
    flex: 1, // Đảm bảo phần danh sách sản phẩm có thể cuộn
  },
});

export default DatHang;
