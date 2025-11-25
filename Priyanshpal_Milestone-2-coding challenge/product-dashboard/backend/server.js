//Here is server.js file for backend server using Express.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const dataPath = path.join(__dirname, 'products.json');

function readData() {
  const data = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

app.get('/products', (req, res) => {
  const data = readData();
  res.json(data.products);
});

app.get('/products/:id', (req, res) => {
  const data = readData();
  const product = data.products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.post('/products', (req, res) => {
  const data = readData();
  const newProduct = {
    id: data.products.length + 1,
    ...req.body
  };
  data.products.push(newProduct);
  writeData(data);
  res.status(201).json(newProduct);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});