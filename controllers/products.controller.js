const db = require("../db");

exports.getAllProducts = (req, res) => {
  let q = `SELECT p.*, c.name as category FROM products as p 
          JOIN categories as c on p.category_id = c.category_id`;
  if (req.query.search) {
    q = `SELECT p.*, c.name as category FROM products as p
        JOIN categories as c on p.category_id = c.category_id
        WHERE p.name LIKE '%${req.query.search}%' OR p.description LIKE '%${req.query.search}%'`;
  }
  db.query(q, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message, error: err });
      return;
    }
    res.status(200).json({ message: "success", data: result });
  });
};

exports.getProductById = (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT p.*, c.name as category FROM products as p
    JOIN categories as c on p.category_id = c.category_id
    WHERE p.product_id = ${id}`,
    (err, result) => {
      if (err) {
        res.status(500).send({ message: err.message, error: err });
        return;
      } else {
        if (result.length === 0) {
          res.status(404).send({ message: "Product not found", data: null });
          return;
        }
        res.status(200).json({ message: "success", data: result });
      }
    }
  );
};

exports.getProductByCategory = (req, res) => {
  const categoryId = req.params.categoryId;
  db.query(
    `SELECT p.*, c.name as category FROM products as p
    JOIN categories as c on p.category_id = c.category_id
    WHERE p.category_id = ${categoryId}`,
    (err, result) => {
      if (err) {
        res.status(500).send({ message: err.message, error: err });
        return;
      } else {
        if (result.length === 0) {
          res.status(404).send({ message: "Product not found", data: null });
          return;
        }
        res.status(200).json({ message: "success", data: result });
      }
    }
  );
};

exports.createProduct = (req, res) => {
  const { name, price, category_id } = req.body;
  const description = req.body.description || null;
  if (!name || !price || !category_id) {
    res.status(400).send({ message: "Missing required information" });
    return;
  }
  db.query(
    `INSERT INTO products (name, price, description, category_id) 
    VALUES (${name}, ${price}, ${description}, ${category_id})`,
    (err, result) => {
      if (err) {
        res.status(500).send({ message: err.message, error: err });
        return;
      }
      res.status(201).json({ message: "success", data: result });
    }
  );
};

exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const { name, price, category_id } = req.body;
  const description = req.body.description || null;
  if (!name || !price || !category_id) {
    res.status(400).send({ message: "Missing required information" });
    return;
  }
  db.query(
    `UPDATE products SET 
    name = ${name}, 
    price = ${price}, 
    description = ${description},
    category_id = ${category_id} 
    WHERE id = ${id}`,
    (err, result) => {
      if (err) {
        res.status(500).send({ message: err.message, error: err });
        return;
      }
      res.status(200).json({ message: "success", data: result });
    }
  );
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM products WHERE id = ${id}`, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message, error: err });
      return;
    }
    res.status(200).json({ message: "success", data: result });
  });
};
