import React from 'react';
import '../../styles.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} My Bookshelf</p>
    </footer>
  );
};

export default Footer;
