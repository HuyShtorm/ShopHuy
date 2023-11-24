import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Image, Pressable, TextInput, FlatList,ScrollView,TouchableOpacity } from 'react-native';
import TrangChu from '../ShopHuy/View/TrangChu';
import SanPham from '../ShopHuy/View/SanPham';
import GioHang from '../ShopHuy/View/GioHang';
import { CartProvider } from '../ShopHuy/View/CartContext';
import DangNhap from '../ShopHuy/View/DangNhap';
import DatHang from '../ShopHuy/View/DatHang';
import DangKy from './View/DangKy';
import XemDanhSachNguoiDung from './View/XemDanhSachNguoiDung';
import HoanThanh from './View/HoanThanh';
import ThongTinNguoiDung from './View/ThongTinNguoiDung';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='TrangChu'>
        <Stack.Screen
          name="TrangChu"
          component={TrangChu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SanPham"
          component={SanPham}
          options={{
            title: 'Sản Phẩm',
           
          }}
        />
        <Stack.Screen
          name="GioHang"
          component={GioHang}
          options={{ title:'Giỏ Hàng'}}
        />

<Stack.Screen name="DangNhap" component={DangNhap}  options={{
            title: 'Đăng Nhập',
           
          }} />
        <Stack.Screen name="DatHang" component={DatHang}  options={{
            title: 'Đặt Hàng',
           
          }}/>
           <Stack.Screen name="DangKy" component={DangKy}  options={{
            title: 'Đăng Ký',
           
          }}/>
          <Stack.Screen name="XemDanhSachNguoiDung" component={XemDanhSachNguoiDung}  options={{
            title: 'Danh Sách Người Dùng',
           
          }}/>
          <Stack.Screen name="HoanThanh" component={HoanThanh}  options={{
            title: 'Hoàn Thành',
           
          }}/>
         <Stack.Screen name="ThongTinNguoiDung" component={ThongTinNguoiDung}  options={{
            title: 'Thông tin người dùng',
           
          }}/>
      </Stack.Navigator>
    </NavigationContainer></CartProvider>
  );
}
// headerRight: () => (
//   <TouchableOpacity
//     onPress={() => {
//       // Xử lý sự kiện khi nhấn vào biểu tượng giỏ hàng
//       console.log('Navigate to Cart');
//       // Điều hướng đến màn hình giỏ hàng của bạn, bạn có thể thay đổi 'GioHang' thành màn hình giỏ hàng của bạn.
//       navigation.navigate('GioHang');
//     }}
//     style={{ marginRight: 16 }}
//   >
//     <Image source={require('../ShopHuy/img/shop.png')} style={{ width: 24, height: 24 }} />
//   </TouchableOpacity>
// ),