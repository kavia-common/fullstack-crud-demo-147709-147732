const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Express API',
      version: '1.0.0',
      description: 'A simple Express API documented with Swagger',
    },
    components: {
      schemas: {
        Item: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier for the item'
            },
            name: {
              type: 'string',
              description: 'The name of the item'
            },
            description: {
              type: 'string',
              description: 'The item description'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update date'
            }
          },
          required: ['name']
        }
      }
    },
    tags: [
      { name: 'Items', description: 'CRUD operations for items' }
    ]
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
