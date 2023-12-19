import React, { useState, useEffect, useMemo } from 'react'; 
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import BookList from './components/books/BookList';
import AddBook from './components/books/AddBook';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import SearchBooks from './components/books/SearchBooks';
import BookSearchPage from './components/books/BookSearchPage';
import WishlistPage from './components/wishlist/WishlistPage'; 
import { WishlistProvider } from './components/wishlist/WishlistContext';
import Footer from './components/common/Footer'; 
import { exportDataToPDF } from './utils/DataManagement';
import './styles.css'; 

const App = () => {
  const [books, setBooks] = useState(() => {
    const storedBooks = localStorage.getItem('books');
    return storedBooks ? JSON.parse(storedBooks) : [];
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('loggedInUser') != null;
  });

  const [darkTheme, setDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('darkTheme');
    return savedTheme === 'true';
  });

  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkTheme);
    localStorage.setItem('books', JSON.stringify(books));
  }, [darkTheme, books]);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const addBook = (newBook) => {
    const bookWithTime = { ...newBook, addedAt: new Date().toLocaleString() };
    setBooks([...books, bookWithTime]);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
  };

  const updateBookStatus = (updatedBooks) => {
    setBooks(updatedBooks);
  };

  const deleteBook = (updatedBooks) => {
    setBooks(updatedBooks);
  };

  
  const handleExportToPDF = () => {
    exportDataToPDF(books);
};

  const [searchTerm, setSearchTerm] = useState(''); 
  const [filterStatus, setFilterStatus] = useState('');

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearchTerm = searchTerm
        ? book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
  
      const matchesFilterStatus = filterStatus
        ? book.status === filterStatus
        : true;
  
      return matchesSearchTerm && matchesFilterStatus;
    });
  }, [books, searchTerm, filterStatus]);
  
  return (
    <WishlistProvider>
    <Router>
      <div className={`Container ${darkTheme ? 'dark-theme' : ''}`}>
        <div className="Header">
          <h1>My Bookshelf</h1>
          <button onClick={toggleTheme} className="ThemeToggle">
            <FontAwesomeIcon icon={darkTheme ? faSun : faMoon} />
          </button>
        </div>
        <div className="Navigation">
          {isLoggedIn ? (
            <>
              <SearchBooks onSearch={setSearchTerm} />
              <Link to="/" className="NavLink">Home</Link>
              <Link to="/add" className="NavLink">Add Book</Link>
              <select
                className="NavLink" 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="">All Statuses</option>
                <option value="Reading">Reading</option>
                <option value="Read it">Read it</option>
                <option value="In the plans">In the plans</option>
              </select>             
               <Link to="/search" className="NavLink">Book Search</Link>
               <Link to="/wishlist" className="NavLink">Wishlist</Link>
              <Link to="/logout" onClick={handleLogout} className="NavLink LogoutButton">Logout</Link>
              
            </>
          ) : (
            <>
              <Link to="/login" className="NavLink">Login</Link>
              <Link to="/register" className="NavLink">Register</Link>
            </>
          )}
        </div>
        
        <Routes>
          {isLoggedIn ? (
            <>
            
              <Route path="/" element={<BookList books={filteredBooks} updateBookStatus={updateBookStatus} deleteBook={deleteBook} />} />
              <Route path="/add" element={<AddBook addBook={addBook} />}/>
              <Route path="/search" element={<BookSearchPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
            </>
          ) : (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login setLoggedIn={setIsLoggedIn} />} />
              <Route path="*" element={<Navigate to="/login" replace />} /> 

            </>
          )}
        </Routes>
        <div className="DataManagement">
        <button onClick={handleExportToPDF}>Export data to PDF</button>
        </div>
        <Footer /> 
      </div>
      
    </Router>    
    </WishlistProvider>

  );
};

export default App;
