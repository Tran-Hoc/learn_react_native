// app/screen/ProductList.tsx
import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import ProductCard from "../components/ProductCard";
import { Product } from "../../type/index"; // Import interface Product
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/RootStackParamList";
import { MOCK_PRODUCTS } from "@/data/FakeProducts";

type ProductListScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "ProductList"
>;

const ProductList: React.FC = () => {
  const navigation = useNavigation<ProductListScreenNavigationProp>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mô phỏng việc gọi API
    setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={(product) =>
        navigation.navigate("ProductDetail", { productId: product.id })
      }
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        numColumns={2} // Hiển thị 2 sản phẩm trên một hàng
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingHorizontal: 5,
  },
  row: {
    justifyContent: "space-between",
  },
});

export default ProductList;
