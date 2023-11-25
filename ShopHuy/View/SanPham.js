import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity ,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';

import { useCart } from './CartContext';

const SanPham = ({ route }) => {
  const { data } = route.params;
  const navigation = useNavigation();
  const { cart, dispatch } = useCart();

  useEffect(() => {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            console.log('Navigate to Cart');
            navigation.navigate('GioHang');
          }}
          style={{ marginRight: 16 }}
        >
          <Image source={require('../img/shop.png')} style={{ width: 24, height: 24 }} />
          <Text style={{ color: 'white' }}>{totalItems}</Text>
        </TouchableOpacity>
      ),
    });
  }, [cart, navigation]);

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: data });
    console.log('Updated Cart:', cart);
    console.log('Added to Cart:', data);
    alert('Thêm vào giỏ hàng thành công');
  };
  
  

  const buyNow = () => {
    // Implement logic to proceed to the checkout or payment screen
    console.log('Buy Now:', data);
    navigation.navigate('GioHang')
  };

  return (
    <View style={styles.container}>
      <Image source={data.imageLocal} style={styles.image} />
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.shop}>Shop : {data.shop}</Text>
      <Text style={styles.price}>₫{data.price}</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
  <TouchableOpacity style={[styles.button, styles.addToCartButton]} onPress={addToCart}>
    <Image source={require('../img/shop.png')} style={styles.icon} />
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
        <Pressable onPress={() => navigation.navigate('TrangChu')}>
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
  icon: {
    width: 24,
    height: 24,
    marginRight: 8, // Khoảng cách giữa biểu tượng và văn bản
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
    flex: 1,
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
    backgroundColor: '#F93409',
  },
  buyNowButton: {
    backgroundColor: '#3474EB',
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
});

export default SanPham;
