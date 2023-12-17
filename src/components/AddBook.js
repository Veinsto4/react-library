import React, { useState } from 'react';
import '../styles.css'; 

const AddBook = ({ addBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('Reading');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState(0);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      id: Date.now(),
      title,
      author,
      status,
      image,
      rating,
    };
    addBook(newBook);
    setTitle('');
    setAuthor('');
    setStatus('Reading');
    setImage('');
    setRating(0);
  };

  return (
    <div>
      <h2>Add a Book</h2>
      <form className="Form" onSubmit={handleSubmit}>
        <div className="FormGroup">
          <label className="Label" htmlFor="title">Title:</label>
          <input
            className="Input"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="FormGroup">
          <label className="Label" htmlFor="author">Author:</label>
          <input
            className="Input"
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        
        <div className="FormGroup">
          <label className="Label" htmlFor="image">Book Image:</label>
          <input
            className="Input"
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="FormGroup">
          <label className="Label" htmlFor="rating">Rating:</label>
          <input
            className="Input"
            type="number"
            id="rating"
            min="0"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div className="FormGroup">
          <label className="Label" htmlFor="status">Status:</label>
          <select
            className="Select"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Reading">Reading</option>
            <option value="Read it">Read it</option>
            <option value="In the plans">In the plans</option>
          </select>
        </div>
        <button className="Button" type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddBook;
