import React, { createContext, useState, useContext } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const addToWishlist = (book) => {
    if (!wishlist.some(wishlistBook => wishlistBook.id === book.id)) {
      const newWishlistItem = {
        id: book.id,
        title: book.volumeInfo.title, 
        image: book.volumeInfo.imageLinks.thumbnail, 
      };
      const newWishlist = [...wishlist, newWishlistItem];
      setWishlist(newWishlist);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    }
  };

  const removeFromWishlist = (bookId) => {
    const newWishlist = wishlist.filter(book => book.id !== bookId);
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
