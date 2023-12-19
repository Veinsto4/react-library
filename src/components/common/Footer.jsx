// Footer.js
import React from 'react';
import './Footer.css'; // Убедитесь, что вы создали соответствующий CSS файл для стилей

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} My Bookshelf. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
