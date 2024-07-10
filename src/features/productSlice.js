import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, limit }, { getState }) => {
    const { product } = getState();

    if (product.byPage[page]) return null;
    const res = await axios.get(
      `http://localhost:3000/products?page=${page}&limit=${limit}`
    );

    return { page, data: res.data };
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    byPage: {},
    status: "idle",
    totalProducts: 0,
    error: null,
  },
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
            data: { results, products },
          } = action.payload;
          state.byPage[page] = products;
          state.totalProducts = results;
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
