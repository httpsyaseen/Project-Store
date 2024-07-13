import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

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
import Test from "./pages/Test.jsx";
import Private from "./components/Private.jsx";
import CartScreen from "./pages/CartScreen.jsx";
import OrderScreen from "./pages/OrderScreen.jsx";
import ProfileScreen from "./pages/profileScreen.jsx";

const Layout = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header
        message={"Free Shipping over the order of Rs 2000/- and above."}
      />

      <ScrollToTop />
      <main style={{ minHeight: "45vh" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        {/* NORMAL ROUTES */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="products" index element={<ProductsPage />} />
            <Route path="product-detail/:id" element={<ProductDetailsPage />} />
            <Route path="cart" element={<CartScreen />} />
            <Route path="test" element={<Test />} />

            {/* ONLY NO AUTH ROUTE */}
            <Route
              path="login"
              element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="signup"
              element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
            />
            <Route path="userorders" element={<OrderScreen />} />
            {/* PROTECTED ROUTES */}
            <Route element={<Private />}>
              <Route path="checkout" element={<Checkout />} />
              <Route path="profile" element={<ProfileScreen />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
