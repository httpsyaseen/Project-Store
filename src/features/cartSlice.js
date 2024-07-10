import { createSlice } from "@reduxjs/toolkit";
import { saveState, loadState } from "../utils/storage";

const initialState = loadState("cart") || {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      console.log(newItem);
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity += newItem.quantity || 1;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: newItem.quantity || 1,
          totalPrice: newItem.price * (newItem.quantity || 1),
          name: newItem.name,
          image: newItem.image,
        });
      } else {
        existingItem.quantity += newItem.quantity || 1;
        existingItem.totalPrice += newItem.price * newItem.quantity;
      }
      state.totalAmount += newItem.price * (newItem.quantity || 1);
      saveState("cart", state);
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      state.totalAmount -= existingItem.price;
      saveState("cart", state);
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      saveState("cart", state);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
