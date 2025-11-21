const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

let products = [
  { id: 1, name: 'Laptop', price: 100000 },
  { id: 2, name: 'Phone', price: 50000 }
];

// GET all products
app.get('/products', (req, res) => {
  res.json(products);
});

// POST new product with validation
app.post('/products', 
  body('name').notEmpty().withMessage('Name is required'),
  body('price').isNumeric().withMessage('Price must be numeric'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const newProduct = {
      id: products.length + 1,
      name: req.body.name,
      price: req.body.price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  }
);

app.listen(5000, () => {
  console.log('Q9 Products API running on http://localhost:5000');
  console.log('\nTest with:');
  console.log('GET  http://localhost:5000/products');
  console.log('POST http://localhost:5000/products');
});