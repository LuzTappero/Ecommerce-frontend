import { Link } from "react-router-dom";
import './subheader.css'

function Subheader() {
  return (
    <section className="subheader">
      <div className="subheader__left-content">
        <h2>Unleash Your Inner Beauty with Every Outfit.</h2>
          <button className="subheader__button">
            <Link to="/shop" className="link">
              GO STORE
            </Link>
          </button>
      </div>
      <div className="subheader__right-content"></div>
    </section>
  );
}

export default Subheader;
