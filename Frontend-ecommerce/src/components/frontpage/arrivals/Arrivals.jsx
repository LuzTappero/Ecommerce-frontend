import "./arrivals.css"
import { useNavigate } from "react-router-dom";

function Arrivals() {
  const navigate = useNavigate(); 

  const handleNavigation = () => {
      navigate(`/shop/`);
    }
  
  return (
    <section className="newArrivals">
      <h2 className="newArrivals__tittle">NEW ARRIVALS</h2>
      <div onClick={() => handleNavigation()}></div>
      <div onClick={() => handleNavigation()}></div>
      <div onClick={() => handleNavigation()}></div>
      <div onClick={() => handleNavigation()}></div>
    </section>
  );
}

export default Arrivals;
