import Header from "../components/landingPage/Header";
import Slider from "../components/landingPage/Slider";
import Products from "../components/landingPage/Products";
import Information from "../components/landingPage/Information";
import Welcome from "../components/landingPage/Welcome";
import Footer from "../components/landingPage/Footer";

const Main = () => {
  return (
    <>
      <Header
        message={" Free Shipping over the order of Rs 2000/- and above."}
      />
      <Slider />
      <main>
        <Products />
        <Information />
        <Products />
        <Welcome />
        <Footer />
      </main>
    </>
  );
};

export default Main;
