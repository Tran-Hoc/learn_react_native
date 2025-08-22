// app/screen/ProductDetail.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
} from "react-native";

import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice"; // Import action từ cartSlice
import { Product } from "../../type/index"; // Import interface Product
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/RootStackParamList";
import { MOCK_PRODUCTS } from "@/data/FakeProducts";
import { useNavigation } from "expo-router";

// Mock data (dữ liệu giả, thay thế bằng API thực tế)

type DetailProductScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ProductDetail"
>;

function ProductDetail({ route }: DetailProductScreenProps) {
  const dispatch = useDispatch();
  const { productId } = route.params as { productId: number };

  const [product, setProduct] = useState<Product | null>(null);

  const navigation = useNavigation();

  const handleGoToCart = () => {
    navigation.navigate("Cart");
  };

  useEffect(() => {
    // Trong thực tế, bạn sẽ gọi API để lấy thông tin sản phẩm dựa trên productId.
    const foundProduct = MOCK_PRODUCTS.find((p) => p.id === productId);
    setProduct(foundProduct || null);
  }, [productId]);

  const handleAddToCart = () => {

    if (product) {
      dispatch(addItem(product)); // Dispatch action 'addItem' với sản phẩm hiện tại
      Alert.alert("Thành công", `${product.name} đã được thêm vào giỏ hàng.`);

      
    }
  };

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Không tìm thấy sản phẩm!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>
          {product.price.toLocaleString("vi-VN")} VNĐ
        </Text>
        <Text style={styles.description}>{product.description}</Text>
        <Button
          title="Thêm vào giỏ hàng"
          onPress={handleAddToCart}
          color="#007bff"
        />
        <Button title="Go to Cart" onPress={handleGoToCart} color="#ee2a2aff" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 350,
    resizeMode: "contain",
    backgroundColor: "#f0f0f0",
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    color: "green",
    fontWeight: "600",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    marginBottom: 20,
  },
});

export default ProductDetail;
