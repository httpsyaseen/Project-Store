import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "../constant";

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
};

export const createOrder = async (items, totalAmount) => {
  const url = `${baseURL}api/v1/orders/`;

  const products = items.map((item) => {
    return {
      product: item.id,
      quantity: item.quantity,
    };
  });

  const data = {
    productsList: products,
    totalCost: Math.trunc(totalAmount),
  };

  const res = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  if (res.data.status === "success") {
    localStorage.setItem("cart", "");
  }
  return res.data;
};

export const isUserAllowed = async (productId) => {
  const url = `${baseURL}api/v1/purchases/review-allowed/${productId}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    return data.allowed || false;
  } catch (err) {
    return false;
  }
};

export const getReviews = async (productId) => {
  try {
    const url = `${baseURL}api/v1/reviews/${productId}`;
    const { data } = await axios.get(url);
    return data.reviews;
  } catch (err) {
    return err.message;
  }
};

export const submitReview = async (data) => {
  const url = `${baseURL}api/v1/reviews/`;
  const res = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return res.data;
};

export const getOrders = async () => {
  const url = `${baseURL}api/v1/orders/getUserOrders`;
  console.log(config);
  const res = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return res.data?.orders;
};

export const getProductDetails = async (id) => {
  const url = `${baseURL}api/v1/products/${id}`;
  const res = await axios.get(url);
  return res.data?.product;
};
