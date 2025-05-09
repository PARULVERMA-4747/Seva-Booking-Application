import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const exists = state.items.find(item => item.code === action.payload.code);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.code !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
