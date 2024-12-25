import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { name, description, image, category, rating };
    await axios.post('http://localhost:5000/products', newProduct);
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter product name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            placeholder="Enter product description"
            rows="3"
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter image URL"
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter category"
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rating</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter product rating (1-5)"
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
