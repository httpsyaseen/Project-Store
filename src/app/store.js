import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import productSlice from "../features/productSlice";
import authSlice from "../features/authSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productSlice,
    auth: authSlice,
  },
});

export default store;
