import React, { useState, useEffect } from 'react';
import '../../styles.css'; 

const BookList = ({ books, updateBookStatus, deleteBook }) => {
  const [storedBooks, setStoredBooks] = useState([]);

  useEffect(() => {
    setStoredBooks(books);
  }, [books]);

  const handleStatusChange = (id, newStatus) => {
    const updatedBooks = storedBooks.map((book) =>
      book.id === id ? { ...book, status: newStatus } : book
    );
    updateBookStatus(updatedBooks);
  };

  const handleDelete = (id) => {
    const updatedBooks = storedBooks.filter((book) => book.id !== id);
    deleteBook(updatedBooks);
  };
  const StarRating = ({ rating }) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i}>&#9733;</span>); 
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<span key={i} className="HalfStar">&#9733;</span>); 
      } else {
        stars.push(<span key={i}>&#9734;</span>); 
      }
    }
    return <div className="Rating">{stars}</div>;
  };
  
  return (
        <div className="BooksContainer">
    
      {storedBooks.map((book) => (
        <div className="BookItem" key={book.id}>
          {book.image && (
            <img src={book.image} alt={`Cover of ${book.title}`} className="BookImage" />
            
          )}
          <StarRating rating={book.rating} />

          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Status: {book.status}</p>
          {book.reviews && book.reviews.map(review => (
            <div key={review.id} className="Review">
              <p>{review.text} - <strong>{review.reviewer}</strong></p>
            </div>
          ))}
          <div className="StatusButtonGroup">
            <button onClick={() => handleStatusChange(book.id, 'Reading')}>Reading</button>
            <button onClick={() => handleStatusChange(book.id, 'Read it')}>Read it</button>
            <button onClick={() => handleStatusChange(book.id, 'In the plans')}>In the plans</button>
            <button onClick={() => handleDelete(book.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
