// AuthService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthService {
  // Trong AuthService.js
static USERS_KEY = 'USERS';
// Key để lưu trữ danh sách người dùng trong AsyncStorage
  
  static currentUserType = ''; // Thêm kiểu người dùng hiện tại

  // Trong AuthService.js
static async getUsers() {
    try {
      const usersJson = await AsyncStorage.getItem(this.USERS_KEY);
      return usersJson ? JSON.parse(usersJson) : [];
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người dùng từ AsyncStorage:', error);
      return [];
    }
  }
  

 // Trong AuthService.js
static async saveUsers(users) {
    try {
      const usersJson = JSON.stringify(users);
      await AsyncStorage.setItem(this.USERS_KEY, usersJson);
    } catch (error) {
      console.error('Lỗi khi lưu danh sách người dùng vào AsyncStorage:', error);
    }
  }
  

  static async register(username, password) {
    const users = await this.getUsers();
    const newUser = { username, password };
    users.push(newUser);
    await this.saveUsers(users);
    return newUser;
  }

  static async login(username, password) {
   // Trong AuthService.js
if (username === 'admin' && password === 'admin') {
    this.currentUserType = 'admin';
    return { username: 'admin', password: 'admin', type: 'admin' };
  }
  
    const users = await this.getUsers();
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      this.currentUserType = 'user';
    }
    return user;
  }
}

export default AuthService;
