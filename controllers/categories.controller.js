const db = require('../db');

exports.getAllCategories = (req, res) => {
  db.query('SELECT * FROM categories', (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message, error: err });
      return;
    }
    res.status(200).json({ message: 'success', data: result });
  });
};

exports.getCategoryById = (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM categories WHERE category_id = ${id}`, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message, error: err });
      return;
    }
    if (result.length === 0) {
      res.status(404).send({ message: 'Category not found' });
      return;
    }
    res.status(200).json({ message: 'success', data: result });
  });
};

exports.createCategory = (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).send({ message: 'Missing required information' });
    return;
  }
  db.query(`INSERT INTO categories (name) VALUES (${name})`, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message, error: err });
      return;
    }
    res.status(201).json({ message: 'success', data: result });
  });
};

exports.updateCategory = (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  if (!name) {
    res.status(400).send({ message: 'Missing required information' });
    return;
  }
  db.query(
    `UPDATE categories SET name = ${name} WHERE category_id = ${id}`,
    (err, result) => {
      if (err) {
        res.status(500).send({ message: err.message, error: err });
        return;
      }
      res.status(200).json({ message: 'success', data: result });
    }
  );
};

exports.deleteCategory = (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM categories WHERE category_id = ${id}`, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message, error: err });
      return;
    }
    res.status(200).json({ message: 'success', data: result });
  });
};