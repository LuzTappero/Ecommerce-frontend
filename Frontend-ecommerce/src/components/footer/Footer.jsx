import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__contactInfo">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebook className="footer__contactInfo--icon" />
        </a>
        <a href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
        >
          <FaTwitter className="footer__contactInfo--icon" />
        </a>
        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram className="footer__contactInfo--icon" />
        </a>
        <a
          href="https://whatsapp.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Whatsapp"
        >
          <FaWhatsapp className="footer__contactInfo--icon" />
        </a>
      </div>
      <div className="footer__contactInfo-content">
        <p className="p__copyright">&copy; 2024 Girly. All rights reserved.</p>
        <p className="p__createdby">CREATED BY LUZ TAPPERO</p>
      </div>
    </footer>
  );
}

export default Footer;
