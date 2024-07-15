import axios from "axios";
import Cookies from "js-cookie";

const token = `Bearer ${Cookies.get("token")}`;
const config = {
  headers: { "Content-Type": "application/json", Authorization: token },
};

export const createOrder = async (items, totalAmount) => {
  const url = "http://localhost:3000/api/v1/orders/";

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

  const res = await axios.post(url, data, config);
  if (res.data.status === "success") {
    localStorage.setItem("cart", "");
  }
  return res.data;
};

export const isUserAllowed = async (productId) => {
  const url = `http://localhost:3000/api/v1/purchases/review-allowed/${productId}`;

  try {
    const { data } = await axios.get(url, config);
    console.log(data);
    return data.allowed || false;
  } catch (err) {
    return false;
  }
};

export const getReviews = async (productId) => {
  try {
    const url = `http://localhost:3000/api/v1/reviews/${productId}`;
    const { data } = await axios.get(url);
    return data.reviews;
  } catch (err) {
    return err.message;
  }
};

export const submitReview = async (data) => {
  const url = "http://localhost:3000/api/v1/reviews/";
  try {
    const res = await axios.post(url, data, config);
    return res.data;
  } catch (err) {
    console.log(err.message);
    throw err.message;
  }
};
