import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  storage,
  // You can add blacklist or whitelist here if you want to exclude or include specific reducers
};

const rootReducer = combineReducers({
  cart: cartReducer,
  // Add other reducers here if you have any
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // reducer: {
  //   cart: cartReducer,
  // },
});

export default store;

export const persistor = persistStore(store);
