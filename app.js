const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'task_manager' 
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// Create a task
app.post('/tasks', (req, res) => {
  const { productCode, product, qty, perPrice } = req.body;
  const sql = 'INSERT INTO tasks (productCode, product, qty, perPrice) VALUES (?, ?, ?, ?)';
  db.query(sql, [productCode, product, qty, perPrice], (err, result) => {
    if (err) throw err;
    res.send({ id: result.insertId, productCode, product, qty, perPrice });
  });
});

// Fetch all tasks
app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Fetch a single task
app.get('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM tasks WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { productCode, product, qty, perPrice } = req.body;
  const sql = 'UPDATE tasks SET productCode = ?, product = ?, qty = ?, perPrice = ? WHERE id = ?';
  db.query(sql, [productCode, product, qty, perPrice, id], (err, result) => {
    if (err) throw err;
    res.send({ id, productCode, product, qty, perPrice });
  });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Task deleted' });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
