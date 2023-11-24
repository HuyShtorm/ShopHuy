import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthService from './AuthService';

const XemDanhSachNguoiDung = () => {
  const [userList, setUserList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await AuthService.getUsers();
        setUserList(users);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error);
      }
    };

    fetchData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null, // Ẩn nút quay lại
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButtonContainer}>
            <Text style={styles.logoutButtonText}>Đăng Xuất</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'DangNhap' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh Sách Người Dùng</Text>
      
      {userList.length > 0 ? (
        <FlatList
          data={userList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <Text style={styles.username}>Tên Người Dùng : {item.username}</Text>
             {/* <Text style={styles.password}>{item.password}</Text>
                Che đi mật khẩu 
          <Text style={styles.password}>{'*'.repeat(item.password.length)}</Text>*/}
           <Text style={styles.password}>Mật Khẩu : {'****************'}</Text>
           <Text style={styles.email}>Email :{item.email}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>Không có người dùng nào.</Text>
      )}
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
  userItem: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 8,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  password: {
    fontSize: 16,
    color: 'gray',
  },
  email: {
    fontSize: 16,
    color: 'gray'
  },
  emptyText: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  logoutButtonContainer: {
    backgroundColor: '#F93409',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default XemDanhSachNguoiDung;
