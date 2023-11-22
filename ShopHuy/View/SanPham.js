import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';

import { useCart } from './CartContext';
const SanPham = ({ route }) => {
  const { data } = route.params;
  const navigation = useNavigation();
  const { dispatch } = useCart();
  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: data });
    console.log('Added to Cart:', data);
  };

  const buyNow = () => {
    // Implement logic to proceed to the checkout or payment screen
    console.log('Buy Now:', data);
  };

  return (
    <View style={styles.container}>
      
      <Image source={data.imageLocal} style={styles.image} />
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.shop}>{data.shop}</Text>
      <Text style={styles.price}>₫{data.price}</Text>

      {/* Additional details can be added here based on your requirements */}
      
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.addToCartButton]} onPress={addToCart}>
          <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buyNowButton]} onPress={buyNow}>
          <Text style={[styles.buttonText, styles.buyNowText]}>Mua ngay</Text>
        </TouchableOpacity>
      </View>
      
      {/* View4 */}
      <View style={styles.view4}>
        <Pressable>
          <Image style={styles.img3} source={require('../img/list.png')} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Image style={styles.img3} source={require('../img/home.png')} />
        </Pressable>
        <Pressable>
          <Image style={styles.img3} source={require('../img/back1.png')} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'cover',
   
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    flex: 0,
  },
  shop: {
    fontSize: 18,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    flex: 1, // Để nút mở rộng để đổ dữ liệu vào không gian còn lại
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  addToCartButton: {
    backgroundColor: '#F93409', // Màu của nút "Thêm vào giỏ hàng"
   // Khoảng cách giữa nút "Thêm vào giỏ hàng" và "Mua ngay"
  },
  buyNowButton: {
    backgroundColor: '#3474EB', // Màu của nút "Mua ngay"
   // Khoảng cách giữa nút "Mua ngay" và "Thêm vào giỏ hàng"
  },
  view4: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F93409',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  img3: {
    width: 24,
    height: 24,
  },
  img4: {
    width: 50,
    height: 24,
  },
  img3: {
    width: 24,
    height: 24,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F93409',
    width: '100%',
  },

});

export default SanPham;