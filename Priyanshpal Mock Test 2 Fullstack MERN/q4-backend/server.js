const express = require('express');
const app = express();

app.use(express.json());

// CORS for frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const users = [
  { id: 1, name: 'Priyansh 1', email: 'Priyansh1@test.com' },
  { id: 2, name: 'Priyansh 2', email: 'Priyansh2@test.com' }
];

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(4000, () => console.log('Q4 API running on http://localhost:4000'));