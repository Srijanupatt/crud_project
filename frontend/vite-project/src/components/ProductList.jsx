import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:5000/products', {
        params: { name: searchQuery, category: categoryFilter },
      });
      setProducts(response.data);
    };
    fetchProducts();
  }, [searchQuery, categoryFilter]);

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search products"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Filter by Category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>
      </div>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>Rating:</strong> {product.rating}
                </p>
                <Link to={`/product/${product.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
