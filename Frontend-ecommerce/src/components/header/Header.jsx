import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from "../../Context/authContext";
import { faHome, faShoppingBag, faUserFriends, faUserCircle, faSignOutAlt, faWrench, faStore} from '@fortawesome/free-solid-svg-icons';
import "./header.css";

function Header() {
  const {isAuthenticated, user, logout } = useContext(AuthContext)
  const navigate= useNavigate()

  const handleLogout = ()=>{
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__container-logo">GIRLY</div>
        <nav className="header__container-navbar">
          <ul>
            <li>
            <FontAwesomeIcon className="icon" icon={faHome} />
              <Link to="/" className="link">
                HOME
              </Link>
            </li>
            {(!isAuthenticated || user?.role === 'client') && (
            <li>
              <FontAwesomeIcon  className="icon" icon={faShoppingBag} />
              <Link to="/shop" className="link">
                SHOP
              </Link>
            </li>
            )}
            <li>
            <FontAwesomeIcon  className="icon" icon={faUserFriends} />
              <Link to="/about" className="link">
                ABOUT US
              </Link>
            </li>
            {isAuthenticated ? (
              <>
              {user && user?.role === "admin" ?(
                <ul>
                  <li>
                    <FontAwesomeIcon className="icon" icon={faStore} />
                      <Link to="/shop" className="link">MY STORE</Link>
                  </li>
                  <li>
                    <FontAwesomeIcon className="icon" icon={faWrench} />
                      <Link to="/profile" className="link">ADMIN</Link>
                  </li>
                </ul>
              ) : (
                <li>
                  <FontAwesomeIcon  className="icon" icon={faUserCircle} />
                  <Link to="/profile" className="link">PROFILE</Link>
                </li>
              )}
              <li>
                <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
                <a href="#" onClick={handleLogout} className="link">
                  LOGOUT
                </a>
            </li>
              </>
            ) : (
              <li>
                <FontAwesomeIcon  className="icon" icon={faUserCircle} />
                <Link to="/auth" className="link">
                  ACCOUNT
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
