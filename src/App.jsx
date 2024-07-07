import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/Scroll";
import LandingPage from "./pages/LandingPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Header
          message={" Free Shipping over the order of Rs 2000/- and above."}
        />
        <Routes>
          <Route path="/" index element={<LandingPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
