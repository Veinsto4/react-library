import React from 'react';
import '../../styles.css'; 

const Modal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div className="ModalOverlay" onClick={onClose}>
      <div className="Modal" onClick={(e) => e.stopPropagation()}>
        <div className="ModalHeader">
          <h2 className="ModalTitle">{book.volumeInfo.title}</h2>
          <button className="CloseButton" onClick={onClose}>&times;</button>
        </div>
        {book.volumeInfo.imageLinks?.thumbnail && (
          <img 
            className="ModalImage" 
            src={book.volumeInfo.imageLinks.thumbnail} 
            alt={`Cover of ${book.volumeInfo.title}`} 
          />
        )}
        <div className="ModalBody">
          <p className="ModalAuthor">Author: {book.volumeInfo.authors?.join(', ')}</p>
          <p className="ModalDescription">{book.volumeInfo.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
