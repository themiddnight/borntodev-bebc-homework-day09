const db = require('../db');

const categories = ['Electronics', 'Luxuary', 'Clothes', 'Food'];
const products = [
  { name: 'Wireless Headphones', price: 100, description: 'Wireless headphones with noise cancelling', category_id: 1 },
  { name: 'Wired Headphones', price: 50, description: 'Wired headphones with noise cancelling', category_id: 1 },
  { name: 'Bluetooth Speaker', price: 150, description: 'Bluetooth speaker with 20 hours of battery life', category_id: 1 },
  { name: 'Smart Watch', price: 200, description: 'Smart watch with heart rate monitor', category_id: 1 },
  { name: 'Laptop', price: 1000, description: 'Laptop with 16GB RAM and 1TB SSD', category_id: 1 },
  { name: 'Mouse', price: 25, description: 'Wired mouse', category_id: 1 },
  { name: 'Keyboard', price: 50, description: 'Wired keyboard', category_id: 1 },
  { name: 'Monitor', price: 150, description: '24 inch monitor', category_id: 1 },
  { name: 'Phone', price: 500, description: 'Phone with 128GB storage', category_id: 1 },
  { name: 'TV', price: 1000, description: '50 inch TV', category_id: 1 },
  { name: 'Car', price: 50000, description: 'Car with 4 doors', category_id: 2 },
  { name: 'Boat', price: 100000, description: 'Boat with 2 motors', category_id: 2 },
  { name: 'Helicopter', price: 500000, description: 'Helicopter with 4 seats', category_id: 2 },
  { name: 'Mansion', price: 1000000, description: 'Mansion with 5 bedrooms', category_id: 2 },
  { name: 'Yacht', price: 1000000, description: 'Yacht with 4 bedrooms', category_id: 2 },
  { name: 'Rolex', price: 5000, description: 'Rolex watch', category_id: 2 },
  { name: 'Diamond Ring', price: 10000, description: 'Diamond ring', category_id: 2 },
  { name: 'Fur Coat', price: 5000, description: 'Fur coat', category_id: 2 },
  { name: 'Fancy Car', price: 100000, description: 'Fancy car', category_id: 2 },
  { name: 'Fancy Boat', price: 200000, description: 'Fancy boat', category_id: 2 },
  { name: 'T-Shirt', price: 10, description: 'Cotton T-Shirt', category_id: 3 },
  { name: 'Jeans', price: 30, description: 'Blue jeans', category_id: 3 },
  { name: 'Shorts', price: 20, description: 'Black shorts', category_id: 3 },
  { name: 'Shirt', price: 20, description: 'White shirt', category_id: 3 },
  { name: 'Dress', price: 50, description: 'Black dress', category_id: 3 },
  { name: 'Hat', price: 5, description: 'Baseball cap', category_id: 3 },
  { name: 'Socks', price: 2, description: 'White socks', category_id: 3 },
  { name: 'Shoes', price: 50, description: 'Black shoes', category_id: 3 },
  { name: 'Pizza', price: 10, description: 'Pepperoni pizza', category_id: 4 },
  { name: 'Pasta', price: 15, description: 'Spaghetti with meatballs', category_id: 4 },
  { name: 'Salad', price: 8, description: 'Caesar salad', category_id: 4 },
  { name: 'Burger', price: 10, description: 'Cheeseburger', category_id: 4 },
  { name: 'Steak', price: 20, description: 'Ribeye steak', category_id: 4 },
  { name: 'Chicken', price: 15, description: 'Fried chicken', category_id: 4 },
  { name: 'Tacos', price: 10, description: 'Beef tacos', category_id: 4 },
  { name: 'Burrito', price: 10, description: 'Chicken burrito', category_id: 4 },
  { name: 'Sandwich', price: 5, description: 'Turkey sandwich', category_id: 4 },
  { name: 'Hot Dog', price: 5, description: 'Hot dog with ketchup and mustard', category_id: 4 },
];

function doReset() {

  db.query(`DROP TABLE IF EXISTS categories, products`, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Categories table dropped');

    db.query(`CREATE TABLE IF NOT EXISTS categories (
      category_id INT PRIMARY KEY AUTO_INCREMENT, 
      name VARCHAR(255))`, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Categories table created');

      categories.forEach((category) => {
        db.query(`INSERT INTO categories (name) VALUES ('${category}')`, (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(`Inserted ${category} into categories table`);
        });
      });
    });

    db.query(`CREATE TABLE IF NOT EXISTS products (
      product_id INT PRIMARY KEY AUTO_INCREMENT, 
      name VARCHAR(255), 
      price INT, 
      description VARCHAR(255), 
      category_id INT, 
      INDEX fk_category_idx (category_id ASC) VISIBLE,
      CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES categories (category_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE)
      `, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Products table created');

      products.forEach((product) => {
        db.query(
          `INSERT INTO products (name, price, description, category_id) 
          VALUES ('${product.name}', ${product.price}, '${product.description}', ${product.category_id})`, 
          (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(`Inserted ${product.name} into products table`);
        });
      });
    });
  });
}

exports.resetDatabase = (req, res) => {
  try {
    if (req.query.reset === 'true') {
      doReset();
      res.status(200).send({ message: 'success' });
    } else {
      res.status(400).send({ message: 'Missing required information' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message, error: err });
  }
};