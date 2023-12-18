import React from 'react';
import { useWishlist } from './WishlistContext'; 
import './wishlist.css'; 

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="wishlist-page">
      <h1>Wishlist</h1>
      {wishlist.length > 0 ? (
        <ul className="wishlist-list">
          {wishlist.map(book => (
            <li key={book.id} className="wishlist-item">
              <div className="wishlist-content">
                <img src={book.image} alt={`Cover of ${book.title}`} className="wishlist-book-image" />
                <span className="wishlist-book-title">{book.title}</span>
              </div>
              <button onClick={() => removeFromWishlist(book.id)} className="wishlist-remove-btn">
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};
export default WishlistPage;
