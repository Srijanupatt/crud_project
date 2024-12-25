import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/products/${id}`, product);
      navigate('/');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Edit Product</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={product.name || ''}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={product.description || ''}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            placeholder="Enter product description"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            value={product.image || ''}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
            placeholder="Enter image URL"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            value={product.category || ''}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
            placeholder="Enter category"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rating</label>
          <input
            type="number"
            className="form-control"
            value={product.rating || ''}
            onChange={(e) => setProduct({ ...product, rating: e.target.value })}
            placeholder="Enter product rating (1-5)"
            min="1"
            max="5"
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
