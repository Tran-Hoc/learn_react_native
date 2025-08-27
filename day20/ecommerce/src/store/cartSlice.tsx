


// app/store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem, Product } from '../type';

// Trạng thái ban đầu của giỏ hàng
const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

// Hàm helper để tính toán tổng tiền
const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const productToAdd = action.payload;
      const existingItem = state.items.find(item => item.id === productToAdd.id);

      if (existingItem) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        existingItem.quantity += 1;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
        state.items.push({
          id: productToAdd.id,
          name: productToAdd.name,
          price: productToAdd.price,
          imageUrl: productToAdd.imageUrl,
          quantity: 1,
        });
      }
      // Cập nhật lại tổng tiền
      state.totalPrice = calculateTotalPrice(state.items);
      
    },

    removeItem: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);
      // Cập nhật lại tổng tiền
      state.totalPrice = calculateTotalPrice(state.items);
    },

    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        // Cập nhật lại tổng tiền
        state.totalPrice = calculateTotalPrice(state.items);
      }
    },
    
    clearCart: (state) => {
        state.items = [];
        state.totalPrice = 0;
    }
  },
});

// Export các action để sử dụng trong các component
export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

// Export reducer để tích hợp vào store
export default cartSlice.reducer;