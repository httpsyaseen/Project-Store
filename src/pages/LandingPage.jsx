import Information from "../components/landingPage/Information";
import Welcome from "../components/landingPage/Welcome";
import Category from "../components/landingPage/Category";
import Slider from "../components/landingPage/Slider";

const Main = () => {
  return (
    <>
      <div className="defualt-height">
        <Slider />
        <main>
          <Category />
          <Information />
          <Category type="Top Categories " category="?limit=4" />
          <Welcome />
        </main>
      </div>
    </>
  );
};

export default Main;
