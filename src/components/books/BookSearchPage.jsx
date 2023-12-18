import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../common/Modal'; 
import { useWishlist } from '../wishlist/WishlistContext';
import '../../styles.css'; 


const BookSearchPage = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const { addToWishlist } = useWishlist();

  const searchBooks = async () => {
    setIsLoading(true);
    setError('');
    setBooks([]);

    if (!query) {
      setError('Please enter a search query.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=AIzaSyA3TD8VXSLd6XLiLUOyBi17YUL7DuZTv68`);
      setBooks(response.data.items || []);
    } catch (error) {
      console.error("Error fetching book data:", error);
      setError('Error fetching book data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchBooks();
    }
  };

  const openModal = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className="Container">
      <h1>Book Search</h1>
      <div className="SearchContainer">
        <input 
          className="SearchInput"
          type="text" 
          placeholder="Enter the name of the book"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="SearchButton" onClick={searchBooks} disabled={isLoading}>Search</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="BooksContainer">
        {books.length > 0 ? (
          books.map((book, index) => (
            <div className="BookItem" key={index} onClick={() => openModal(book)}>
              <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
              <h2 className="BookTitle">{book.volumeInfo.title}</h2>
              <p className="BookAuthor">Author: {book.volumeInfo.authors?.join(', ')}</p>
              <button onClick={() => addToWishlist(book)}>Add to Wishlist</button>
            </div>
          ))
        ) : (
          !isLoading && <p>No books found. Try a different query.</p>
        )}
      </div>
      {selectedBook && <Modal book={selectedBook} onClose={closeModal} />}
    </div>
  );
};

export default BookSearchPage;
