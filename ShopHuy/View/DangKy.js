
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DangKy = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // Lấy dữ liệu người dùng hiện tại từ AsyncStorage
    const existingUsers = JSON.parse(await AsyncStorage.getItem('USERS')) || [];
  // Trong DangKy.js
await AsyncStorage.setItem('USERS', JSON.stringify(existingUsers));


    
    
    // Kiểm tra xem người dùng đã tồn tại chưa
    const userExists = existingUsers.some(user => user.username === username);

    if (userExists) {
      console.log('Người dùng đã tồn tại');
      return;
    }

    // Thêm người dùng mới vào danh sách
    const newUser = { username, password };
    existingUsers.push(newUser);

    // Lưu danh sách người dùng mới vào AsyncStorage
   // Trong DangKy.js
await AsyncStorage.setItem('USERS', JSON.stringify(existingUsers));


    console.log('Người dùng đã được đăng ký:', newUser);

    // Chuyển đến trang đăng nhập sau khi đăng ký thành công
    navigation.navigate('DangNhap');
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đăng Ký</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Đăng Ký</Text>
      </TouchableOpacity>
      <Text style={styles.loginText}>Nếu bạn đã có tài khoản, hãy đăng nhập</Text>
      {/* Thêm nút để chuyển đến trang đăng nhập */}
      <TouchableOpacity onPress={() => navigation.navigate('DangNhap')}>
        <Text style={styles.loginLink}>Đăng nhập ngay</Text>
      </TouchableOpacity>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  registerButton: {
    backgroundColor: '#3474EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: 16,
  },
  loginLink: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
});

export default DangKy;
