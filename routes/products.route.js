const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  getProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Get all products with search by name or description
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           required: false
 *           description: Search product by name or description
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getAllProducts);
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by id
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: Product id
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", getProductById);
/**
 * @swagger
 * /api/products/category/{categoryId}:
 *   get:
 *     summary: Get product by category id
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: integer
 *           required: true
 *           description: Category id
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get("/category/:categoryId", getProductByCategory);
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 description: Category id
 *               name:
 *                 type: string
 *                 description: Product name
 *               price:
 *                 type: integer
 *                 description: Product price
 *               description:
 *                 type: string
 *                 description: Product description
 *             example:
 *               categoryId: 1
 *               name: Product 1
 *               price: 100
 *               description: Product 1 description
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 description: Category id
 *               name:
 *                 type: string
 *                 description: Product name
 *               price:
 *                 type: integer
 *                 description: Product price
 *               description:
 *                 type: string
 *                 description: Product description
 *           example:
 *             categoryId: 1
 *             name: Product 1
 *             price: 100
 *             description: Product 1 description
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post("/", createProduct);
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product by id
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: Product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 description: Category id
 *               name:
 *                 type: string
 *                 description: Product name
 *               price:
 *                 type: integer
 *                 description: Product price
 *               description:
 *                 type: string
 *                 description: Product description
 *             example:
 *               categoryId: 1
 *               name: Product 1
 *               price: 100
 *               description: Product 1 description
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 description: Category id
 *               name:
 *                 type: string
 *                 description: Product name
 *               price:
 *                 type: integer
 *                 description: Product price
 *               description:
 *                 type: string
 *                 description: Product description
 *           example:
 *             categoryId: 1
 *             name: Product 1
 *             price: 100
 *             description: Product 1 description
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.put("/:id", updateProduct);
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: Product id
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", deleteProduct);

module.exports = router;
