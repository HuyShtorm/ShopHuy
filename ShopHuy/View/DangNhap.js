// DangNhap.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AuthService from './AuthService';

const DangNhap = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const user = await AuthService.login(username, password);
    if (user) {
     
      console.log('Đăng nhập thành công, user:', user);

      // Trong DangNhap.js
if (user.type === 'admin') {
  navigation.navigate('XemDanhSachNguoiDung');
} else {
  navigation.navigate('DatHang');
}

    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đăng Nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng Nhập</Text>
      </TouchableOpacity>
      <Text style={styles.registerText}>Nếu bạn chưa có tài khoản, hãy đăng ký</Text>
      <TouchableOpacity onPress={() => navigation.navigate('DangKy')}>
        <Text style={styles.registerLink}>Đăng ký ngay</Text>
      </TouchableOpacity>

      {/* Thêm nút "Xem Danh Sách" */}
     
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
  loginButton: {
    backgroundColor: '#3474EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 16,
  },
  registerLink: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
  viewListLink: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
});

export default DangNhap;