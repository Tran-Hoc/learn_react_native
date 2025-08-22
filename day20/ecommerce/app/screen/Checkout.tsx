// app/screen/Checkout.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../store/store';
import { clearCart } from '../store/cartSlice';

const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handlePlaceOrder = () => {
    if (!customerName || !email || !address) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
      return;
    }

    // Mô phỏng quá trình xử lý đơn hàng
    // Trong thực tế, bạn sẽ gửi dữ liệu này lên server
    console.log('Thông tin đơn hàng:', {
      items: cartItems,
      totalPrice,
      customerInfo: { name: customerName, email, address },
    });

    // Giả lập thành công và xóa giỏ hàng
    dispatch(clearCart());
    
    Alert.alert('Thành công', 'Đơn hàng của bạn đã được đặt!');
    navigation.navigate('ProductList'); // Quay về màn hình danh sách sản phẩm
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Thông tin thanh toán</Text>

      <Text style={styles.label}>Tên của bạn</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCustomerName}
        value={customerName}
        placeholder="Nhập tên"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Nhập email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Địa chỉ giao hàng</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAddress}
        value={address}
        placeholder="Nhập địa chỉ"
        multiline
      />

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryHeader}>Tóm tắt đơn hàng</Text>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Text style={styles.itemText}>{item.name} x{item.quantity}</Text>
            <Text style={styles.itemText}>{item.price * item.quantity} VNĐ</Text>
          </View>
        ))}
        <View style={styles.divider} />
        <Text style={styles.totalText}>Tổng cộng: {totalPrice.toLocaleString('vi-VN')} VNĐ</Text>
      </View>

      <Button
        title="Đặt hàng"
        onPress={handlePlaceOrder}
        color="#007bff"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  summaryContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  summaryHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemText: {
    fontSize: 14,
    color: '#555',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: 'green',
  },
});

export default Checkout;