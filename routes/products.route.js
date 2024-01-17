const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  getProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controller');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/category/:categoryId', getProductByCategory);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
