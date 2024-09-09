
import Subheader from "./subheader/Subheader";
import AboutUs from "./about/About";
import Arrivals from "./arrivals/Arrivals";

function MainContent() {
  return (
    <main>
      <Subheader />
          <Arrivals />
      <AboutUs />
    </main>
  );
}

export default MainContent;
