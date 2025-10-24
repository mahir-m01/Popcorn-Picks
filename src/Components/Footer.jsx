import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <h1>Designed & Developed by Vetri</h1>
      <div className="footer-links">
        <a
          href="https://www.linkedin.com/in/vetriselvan-r-a238b7263"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link linkedin"
        >
          <FaLinkedin /> LinkedIn
        </a>
        <a
          href="https://www.instagram.com/im.vetri"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link instagram"
        >
          <FaInstagram /> Instagram
        </a>
      </div>
    </div>
  );
}

export default Footer;

