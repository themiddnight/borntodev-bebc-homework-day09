const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const categoryRouter = require('./routes/categories.route');
const productRouter = require('./routes/products.route');

const path = '/api';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(`${path}/categories`, categoryRouter);
app.use(`${path}/products`, productRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
