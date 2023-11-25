import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import AuthService from './AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DangNhap = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleGoBack = () => {
    navigation.navigate('TrangChu');
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      const user = await AuthService.getCurrentUser();
      if (user) {
        // Người dùng đã đăng nhập, điều hướng đến màn hình phù hợp
        navigateToScreen(user.type);
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra trạng thái đăng nhập:', error);
      
    }
  };

  const handleLogin = async () => {
    try {
      const user = await AuthService.login(username, password);
      if (user) {
        console.log('Đăng nhập thành công, user:', user);

        // Lưu thông tin người dùng vào AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(user));

        // Điều hướng đến màn hình phù hợp
        navigateToScreen(user.type);
      } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng.');
      } 
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      alert('Đã xảy ra lỗi khi đăng nhập.');
    }
  };

  const navigateToScreen = (userType) => {
    if (userType === 'admin') {
      navigation.navigate('XemDanhSachNguoiDung');
    } else {
      navigation.navigate('DatHang');
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

      {/* Nút quay lại trang chủ */}
      <View style={styles.goBackContainer}>
        <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
          <Text style={styles.goBackText}>Quay lại trang chủ</Text>
        </TouchableOpacity>
    </View></View>
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
    backgroundColor: '#F93409',
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
  goBackContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 16, // Khoảng cách từ nút đến đáy màn hình
  },
  goBackButton: {
    backgroundColor: '#F93409',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%', // Điều chỉnh chiều rộng của nút
  },
  goBackText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DangNhap;