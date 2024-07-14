import axios from "axios";
import Cookies from "js-cookie";

const createOrder = async (items, totalAmount) => {
  const token = `Bearer ${Cookies.get("token")}`;
  const config = {
    headers: { "Content-Type": "application/json", Authorization: token },
  };
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

export default createOrder;
