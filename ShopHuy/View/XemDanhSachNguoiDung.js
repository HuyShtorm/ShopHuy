// XemDanhSachNguoiDung.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AuthService from './AuthService';
const XemDanhSachNguoiDung = () => {
  const [userList, setUserList] = useState([]);

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh Sách Người Dùng</Text>
      
      {userList.length > 0 ? (
        <FlatList
          data={userList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.password}>{item.password}</Text>
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
  emptyText: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export default XemDanhSachNguoiDung;
