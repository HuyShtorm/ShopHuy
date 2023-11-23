import React, {useRef, useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput, FlatList,ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import data from '../data/datahome';
import datasale from '../data/datasale';
import { useNavigation } from '@react-navigation/native';

import SanPham from './SanPham';
import GioHang from './GioHang';
const TrangChu = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
//tim kiem 
const [filteredData, setFilteredData] = useState([]);
const [filteredSaleData, setFilteredSaleData] = useState([]);

  const renderSaleItem = ({ item }) => (
    <View style={styles.view1}>
      <Text style={styles.saleText}>Sale</Text> {/* Thêm phần tiêu đề "Sale" */}
      <Image source={item.imageLocal} style={styles.img5} />
      <Pressable onPress={() => navigation.navigate('SanPham',{data:item})}>
      <View style={styles.view2}>
        <Text style={styles.text1}>{item.name}</Text>
        <Text style={styles.text2}>₫{item.price}</Text> {/* Sử dụng một style mới cho giá để giảm kích thước */}
      </View>
      </Pressable>
    </View>
  );
  useEffect(() => {
    console.log('Search Text Changed:', searchText);
  
    // Lọc dữ liệu dựa trên từ khóa tìm kiếm
    const filteredResults = data.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filteredResults);
    console.log('Filtered Data:', filteredResults);
  }, [searchText]);
  

  useEffect(() => {
    const filteredSaleResults = datasale.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredSaleData(filteredSaleResults);
    console.log('Filtered Sale Data:', filteredSaleResults);
  }, [searchText]);
  
  
  return (
    <ScrollView>
    <View style={styles.container}>
    <View style={styles.view}>
          {/* Thanh tìm kiếm */}
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm..."
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        <Pressable onPress={() => navigation.navigate('GioHang')}>
          <Image style={styles.img3} source={require('../img/shop.png')} />
          
        </Pressable>
        <Pressable>
          <Image style={styles.img4} source={require('../img/chatcc.png')} />
        </Pressable>
      </View>
      <ScrollView>
<View style={styles.saleContainer}>
<Text style={styles.carouselTitle}>Sale</Text>
      <Carousel
        data={datasale}
        renderItem={renderSaleItem}
        sliderWidth={350}
        itemWidth={120}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        loop={true}
        autoplay={true}
        autoplayInterval={100}
        layout={'default'}
        layoutCardOffset={9}
      />
      </View>
      </ScrollView>
      <View style={styles.saleContainer}>
      <Text style={styles.carouselTitle}>Đề Xuất </Text>
      <FlatList
        numColumns={2}
        data={filteredData}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('SanPham',{data:item})}>
          <View style={styles.view1}>
            <Image source={item.imageLocal} style={styles.img5} />
            <View style={styles.view2}>
              <Text style={styles.text1}>{item.name}</Text>
              <Text style={styles.text2}>₫{item.price}</Text>

            </View>
          </View></Pressable>
        )}
        keyExtractor={item => item.id}
      /></View>
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
    </View></ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F93409',
    width: '100%',
  },
  img3: {
    width: 24,
    height: 24,
  },
  img4: {
    width: 50,
    height: 24,
  },
  searchInput: {
    height: 30,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginLeft: 0,
    borderRadius: 5,
    width: 250,
  },
  view1: {
    alignItems: 'center',
    margin: 15,
    borderRadius: 10,
    backgroundColor: '#EBFFFA',
    padding: 10,
  },
  img5: {
    width: 120, // Giảm kích thước ảnh
    height: 120, // Giảm kích thước ảnh
    resizeMode: 'contain',
  },
  view2: {
    alignItems: 'center',
  },
  
  text1: {
    fontSize: 16, // Giảm kích thước chữ
    fontWeight: 'bold',
    width: 120,
    textAlign: 'center',
    marginVertical: 5,
  },
  text2: {
    fontSize: 14, // Giảm kích thước chữ
    width: 120,
    textAlign: 'center',
  },
  carouselContainer: {
    marginBottom: 20,
   
  },
  saleContainer: {
    marginTop : 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#F93409',
    padding: 10,
    marginBottom: 20,
  },
  carouselTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recommendationContainer: {
    marginBottom: 20,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  saleText: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: 'red',
    color: 'white',
    padding: 5,
    fontSize: 12,
    zIndex: 1,
  },
  view4: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F93409',
    width: '100%',
  },
});

export default TrangChu;
