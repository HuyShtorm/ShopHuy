import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import { useCart } from './CartContext';

const GioHang = ({ navigation }) => {
  const { cart, dispatch } = useCart();

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image style={styles.itemImage} source={{ uri: item.imageLocal }} 
      />
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₫{item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => dispatch({ type: 'DECREASE_QUANTITY', payload: item })}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.itemQuantity}>{item.quantity || 0}</Text>
          <TouchableOpacity onPress={() => dispatch({ type: 'INCREASE_QUANTITY', payload: item })}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item })}>
        <Text style={styles.removeButton}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Giỏ Hàng</Text>
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCartItem}
        />
      ) : (
        <Text style={styles.emptyCart}>Giỏ hàng trống</Text>
      )}
      {cart.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.total}>Tổng: ₫{calculateTotal()}</Text>
          <TouchableOpacity style={styles.buyNowButton} onPress={() => navigation.navigate('DangNhap')}>
            <Text style={styles.buyNowButtonText}>Mua Ngay</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
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
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 16,
  },
  icon: {
    width: 20, // Điều chỉnh kích thước theo ý muốn
    height: 20,
    tintColor: 'blue', // Màu sắc của biểu tượng
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    color: 'red',
    paddingBottom:10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  
   
  },
  // Thêm borderColor và borderWidth vào phần style của quantityButton và itemQuantity
quantityButton: {
  fontSize: 18,
  paddingHorizontal: 18,
  color: 'black',
  backgroundColor:'#F93409',
  borderColor: 'black',  // Màu đường viền
  borderWidth: 1,        // Độ rộng của đường viền
  borderRadius: 8,      
  padding: 8,            
},
itemQuantity: {
  fontSize: 18,
  marginHorizontal: 8,
  borderColor: 'black',  // Màu đường viền
  borderWidth: 1,        // Độ rộng của đường viền
       // Bo tròn góc
  padding: 8,            
},

  
removeButton: {
  fontSize: 20,
  color: 'black',
  backgroundColor:'#F93409',
  borderColor: 'black',  // Màu đường viền
  borderWidth: 1,        // Độ rộng của đường viền
  borderRadius: 8,       
  padding: 8,            
},

  emptyCart: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 16,
    paddingBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buyNowButton: {
    backgroundColor: '#3474EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buyNowButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F93409',
    position: 'absolute',
    bottom: 0,
    padding :0,
  },
  img3: {
    width: 30,
    height: 30,
    tintColor: 'black',
  },
});

export default GioHang;
