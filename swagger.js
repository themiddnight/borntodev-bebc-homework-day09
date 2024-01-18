const swaggerJsdoc = require('swagger-jsdoc');

// const { port, path } = require('./index');
const base_url = process.env.BASE_URL || 'http://localhost:3000';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Borntodev BEBC homework day 9 API',
      version: '1.0.0',
      description: 'Products API Information',
      contact: {
        name: 'Pathompong Thitithan',
      },
      servers: [
        { url: `http://localhost:${base_url}` }
      ],
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
