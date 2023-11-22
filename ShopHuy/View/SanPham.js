import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const SanPham = ({ route }) => {
  const { data } = route.params;

  return (
    <View style={styles.container}>
      <Image source={data.imageLocal} style={styles.image} />
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.shop}>{data.shop}</Text>
      <Text style={styles.price}>₫{data.price}</Text>

      {/* Additional details can be added here based on your requirements */}
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  shop: {
    fontSize: 18,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: 'red', // Assuming you want to highlight the price in red
    marginBottom: 10,
  },
  // You can add more styles for additional details
});

export default SanPham;
