const express = require('express');
const router = express.Router();

const { resetDatabase } = require('../controllers/resetdata.controller');

/**
 * @swagger
 * /api/resetdata:
 *   get:
 *     summary: Reset database
 *     description: Reset database
 *     tags:
 *       - Reset Data
 *     parameters:
 *       - in: query
 *         name: reset
 *         schema:
 *           type: boolean
 *           description: Reset database
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/', resetDatabase);

module.exports = router;