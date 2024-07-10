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
import CartScreen from "./pages/CartScreen.jsx";
import { Provider } from "react-redux";
import store from "./app/store.js";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebar.jsx";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

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
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="products" index element={<ProductsPage />} />
              <Route
                path="product-detail/:id"
                element={<ProductDetailsPage />}
              />
              <Route path="cart" element={<CartScreen />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="test" element={<Test />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
