import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TrangChu from '../ShopHuy/View/TrangChu';
import SanPham from '../ShopHuy/View/SanPham';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='TrangChu'>
      <Stack.Screen name="TrangChu" component={TrangChu} options={{headerShown:false}}/>
      <Stack.Screen name="SanPham" component={SanPham} options={{title:'Sản Phẩm'}}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}
// <Stack.Screen name="SanPham" component={SanPham} options={{title:'Sản Phẩm'}}/>




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});

