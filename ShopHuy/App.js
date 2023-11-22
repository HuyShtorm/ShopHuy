import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Image, Pressable, TextInput, FlatList,ScrollView,TouchableOpacity } from 'react-native';
import TrangChu from '../ShopHuy/View/TrangChu';
import SanPham from '../ShopHuy/View/SanPham';
import GioHang from '../ShopHuy/View/GioHang';
import { CartProvider } from '../ShopHuy/View/CartContext';
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
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  // Xử lý sự kiện khi nhấn vào biểu tượng giỏ hàng
                  console.log('Navigate to Cart');
                  // Điều hướng đến màn hình giỏ hàng của bạn, bạn có thể thay đổi 'GioHang' thành màn hình giỏ hàng của bạn.
                  navigation.navigate('GioHang');
                }}
                style={{ marginRight: 16 }}
              >
                <Image source={require('../ShopHuy/img/shop.png')} style={{ width: 24, height: 24 }} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="GioHang"
          component={GioHang}
          options={{ title:'Giỏ Hàng'}}
        />
      </Stack.Navigator>
    </NavigationContainer></CartProvider>
  );
}
