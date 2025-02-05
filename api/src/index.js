//Import Express.js
const express = require('express');

//Import Apollo Server and GraphQL Schemas
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

//Import MongoDB and DB models
const connectDB = require('./db');
const models = require('./models');

// Run the server on a port
const port = 4000;

const startServer = async () => {
  //Connect to MongoDB befroe Apollo Server
  await connectDB();

  //Use Express.js
  const app = express();

  // Apollo Server setup
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  // Apply Apollo middleware to Express
  app.use(
    '/api',
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async () => ({
        models,
      }),
    }),
  );

  // Start the server
  app.listen(port, () => {
    console.log(`🚀 GraphQL Server running at http://localhost:${port}/api`);
  });
};

// Start the server.
startServer();
