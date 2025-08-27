// app/screen/Cart.tsx
import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../src/store/store";
import { clearCart } from "../../src/store/cartSlice";
import CartItem from "../../src/components/CartItem";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { CartItem as CartItemType } from "../../src/type";
import { RootStackParamList } from "@/src/navigation/RootStackParamList";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const dispatch = useDispatch();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const MemoizedCartItem = React.memo(CartItem);

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const handleGoToCheckout = useCallback(() => {
    navigation.navigate("Checkout"); // Điều hướng đến màn hình thanh toán
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: CartItemType }) => <MemoizedCartItem item={item} />,
    [MemoizedCartItem]
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
