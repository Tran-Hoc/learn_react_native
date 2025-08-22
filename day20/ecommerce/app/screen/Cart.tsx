// app/screen/Cart.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch, Provider } from "react-redux";
import { RootState, store } from "../store/store";
import { clearCart } from "../store/cartSlice";
import CartItem from "../components/CartItem";
import { useNavigation } from "@react-navigation/native";
import { CartItem as CartItemType, Product } from "../../type";
import { MOCK_PRODUCTS } from "@/data/FakeProducts";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(MOCK_PRODUCTS);
  });

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // let cartItems = products;
  const handleGoToCheckout = () => {
    navigation.navigate("Checkout"); // Điều hướng đến màn hình thanh toán
  };

  const renderItem = ({ item }: { item: CartItemType }) => (
    <CartItem item={item} />
  );

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />
          <View style={styles.summaryContainer}>
            <Text style={styles.totalText}>
              Tổng tiền: {totalPrice.toLocaleString("vi-VN")} VNĐ
            </Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleGoToCheckout}
            >
              <Text style={styles.checkoutButtonText}>Thanh toán</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearCart}
            >
              <Text style={styles.clearButtonText}>Xóa giỏ hàng</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Giỏ hàng của bạn đang trống.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    padding: 10,
  },
  summaryContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 20,
    alignItems: "center",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: "100%",
    marginBottom: 10,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  clearButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "100%",
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 18,
    color: "#888",
  },
});


export default Cart;