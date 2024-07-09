import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import productSlice from "../features/productSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productSlice,
  },
});

export default store;
