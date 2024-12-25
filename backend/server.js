// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// In-memory database for simplicity (you can start with some sample products)
let products = [
    {
        id: 1,
        name: 'Product 1',
        description: 'This is the first product.',
        image: 'https://via.placeholder.com/150',
        category: 'Electronics',
        rating: 4.2,
        ratingsCount: 5,
    },
    {
        id: 2,
        name: 'Product 2',
        description: 'This is the second product.',
        image: 'https://via.placeholder.com/150',
        category: 'Books',
        rating: 3.8,
        ratingsCount: 3,
    },
    // Add more sample products as needed
];

app.use(cors());

// Middleware to parse JSON request body
app.use(express.json());

// Fetch all products with search and filter
app.get('/products', (req, res) => {
    const { name, category } = req.query;
    let filteredProducts = products;

    // Filter by name if provided
    if (name) {
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    // Filter by category if provided
    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    res.json(filteredProducts);
});

// Fetch single product by ID
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

// Add a new product
app.post('/products', (req, res) => {
    const { name, description, image, category, rating } = req.body;
    if (!name || !description || !image || !category || !rating) {
        return res.status(400).send('All fields are required');
    }

    const newProduct = {
        id: products.length + 1,
        name,
        description,
        image,
        category,
        rating,
        ratingsCount: 1,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Update product details
app.put('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');

    const { name, description, image, category } = req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    product.image = image || product.image;
    product.category = category || product.category;

    res.json(product);
});

// Delete a product
app.delete('/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).send('Product not found');

    products.splice(productIndex, 1);
    res.status(204).send(); // No content after successful deletion
});

// Update product rating
app.put('/products/:id/rating', (req, res) => {
    const { newRating } = req.body;
    if (newRating < 1 || newRating > 5) {
        return res.status(400).send('Rating must be between 1 and 5');
    }

    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');

    product.rating = ((product.rating * product.ratingsCount) + newRating) / (product.ratingsCount + 1);
    product.ratingsCount += 1;

    res.json(product);
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
