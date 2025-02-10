"use client";

import styles from "./footer.module.scss";
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Footer Grid */}
        <div className={styles.grid}>
          {/* Address & Contact Info */}
          <div className={styles.section}>
            <h3>Contact Us</h3>
            <p><FaMapMarkerAlt /> IPT & GPTC Computer Science Department,</p>
            <p>Q7P8+56M, Shornur Perinthalmanna Highway, Shoranur, Kulappully, Palakkad, Kerala 679122</p>
            <p><FaPhoneAlt /> 04662220450</p>
            <p><FaEnvelope /> info@xyzcollege.com</p>
          </div>

         

          {/* Social Media */}
          <div className={styles.section}>
            <h3>Connect With Us</h3>
            <div className={styles.socialIcons}>
              <a href="https://facebook.com" target="_blank"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank"><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank"><FaTwitter /></a>
              <a href="mailto:info@xyzcollege.com"><FaEnvelope /></a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className={`${styles.section} ${styles.newsletter}`}>
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for the latest updates and news.</p>
            <form>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Bottom Section */}
        <div className={styles.bottom}>
          <p>
            &copy; <a href="/admin">2024 Computer Science Department</a> | All Rights Reserved
          </p>
          <p>Developed by <span className={styles.highlight}>CLOUD ELEVEN</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
