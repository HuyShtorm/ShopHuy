// GioHang.js
import React from 'react';
import { View, Text } from 'react-native';
import { useCart } from './CartContext';

const GioHang = () => {
  const { cart } = useCart();

  return (
    <View>
      <Text>Giỏ Hàng</Text>
      <View>
        {cart.map((item, index) => (
          <View key={index}>
            <Text>{item.name}</Text>
            {/* Hiển thị các thông tin khác của sản phẩm */}
          </View>
        ))}
      </View>
    </View>
  );
};

export default GioHang;
