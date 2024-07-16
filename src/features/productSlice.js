import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../constant";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page = 1, limit = 10, query = "", clear = false }, { getState }) => {
    const { product } = getState();
    if (product.byPage[page] && !query && !clear) return null;
    const res = await axios.get(
      `${baseURL}api/v1/products?${query}page=${page}&limit=${limit}`
    );

    return { page, data: res.data, query };
  }
);

const initialState = {
  byPage: {},
  status: "idle",
  totalProducts: 0,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (action.payload) {
          const {
            page,
            data: { totalProducts, products, results },
            query,
          } = action.payload;
          state.byPage[page] = products;
          state.totalProducts = query ? results : totalProducts;
        }
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
