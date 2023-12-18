import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import SearchBooks from '../books/SearchBooks'; 
import '../../styles.css'; 


const Header = ({ isLoggedIn, toggleTheme, darkTheme, setSearchTerm }) => {
  return (
    <div className="Header">
      <h1>My Bookshelf</h1>
      <button onClick={toggleTheme} className="ThemeToggle">
        <FontAwesomeIcon icon={darkTheme ? faSun : faMoon} />
      </button>
      <div className="Navigation">
        {isLoggedIn ? (
          <>
            <SearchBooks onSearch={setSearchTerm} />
            <Link to="/" className="NavLink">Home</Link>
            <Link to="/add" className="NavLink">Add Book</Link>
            <Link to="/search" className="NavLink">Book Search</Link>
            <Link to="/wishlist" className="NavLink">Wishlist</Link>
            <Link to="/logout" className="NavLink LogoutButton">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="NavLink">Login</Link>
            <Link to="/register" className="NavLink">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
