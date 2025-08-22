// app/components/ProductCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../../type/index'; // Giả sử bạn đã đặt các interface vào một file riêng, ví dụ: app/types.ts

// Định nghĩa Props cho component
interface Props {
  product: Product;
  onPress: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => onPress(product)}
      activeOpacity={0.7} // Tạo hiệu ứng mờ khi nhấn
    >
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.price}>
          {product.price.toLocaleString('vi-VN')} VNĐ
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    margin: 10,
    overflow: 'hidden',
    width: '45%', // Ví dụ cho 2 cột trên 1 màn hình
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    minHeight: 40, // Đảm bảo chiều cao cố định để không bị xê dịch UI
  },
  price: {
    fontSize: 15,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default ProductCard;