const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');

dotenv.config();

const swaggerSpec = require('./swagger');
const categoryRouter = require('./routes/categories.route');
const productRouter = require('./routes/products.route');
const resetdataRouter = require('./routes/resetdata.route');

const app = express();
const bodyParser = require('body-parser');

const base_url = process.env.BASE_URL || 'http://localhost';
const path = process.env.BASE_PATH || 'api';
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(`/${path}/categories`, categoryRouter);
app.use(`/${path}/products`, productRouter);
app.use(`/${path}/resetdata`, resetdataRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`API is started at: ${base_url}/${path}`);
  console.log(`Swagger is started at: ${base_url}/api-docs`);
});
