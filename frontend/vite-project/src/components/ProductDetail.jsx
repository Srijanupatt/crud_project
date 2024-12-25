import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        navigate('/');
      });
  }, [id, navigate]);

  const handleRatingSubmit = () => {
    if (rating < 1 || rating > 5) {
      alert('Rating must be between 1 and 5.');
      return;
    }

    axios
      .put(`http://localhost:5000/products/${id}/rating`, {
        newRating: parseInt(rating),
      })
      .then((response) => {
        setProduct(response.data); 
        setRating(''); 
      })
      .catch((error) => {
        console.error('Error submitting rating:', error);
      });
  };

  if (!product) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ); 
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h2 className="mb-3">{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Rating:</strong> {product.rating.toFixed(2)} (
            {product.ratingsCount} ratings)
          </p>

          {/* Rating Form */}
          <div className="mt-4">
            <h5>Rate this Product</h5>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="Enter a rating (1-5)"
              />
              <button
                className="btn btn-primary"
                onClick={handleRatingSubmit}
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
