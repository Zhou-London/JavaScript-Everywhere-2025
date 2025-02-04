//Import Express.js
const express = require('express');

//Import Apollo Server
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');

//Import MongoDB and DB models
const connectDB = require('./db');
const models = require('./models/index');

// Run the server on a port
const port = 4000;

// Construct a schema, using GraphQL's schema language
const typeDefs = `

  type Mutation{
    newNote(content: String!): Note!
  }

  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
  }

  type Note{
    id: ID!
    content: String!
    author: String!
  }
`;

// Provide resolver functions for our schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',

    //Return all notes
    notes: async () => {
      return await models.Note.find();
    },

    //Return Single Note
    note: async (parent, args) => {
      return await models.Note.findById(args.id);
    },
  },
  Mutation: {
    //Add new note
    newNote: async (parent, args) => {
      const note = await models.Note.create({
        content: args.content,
        author: 'Adam Scott',
      });
      return {
        id: note._id.toString(),
        content: note.content,
        author: note.author,
      };
    },
  },
};

const startServer = async () => {
  //Connect to MongoDB befroe Apollo Server
  await connectDB();

  //Use Express.js
  const app = express();

  // Apollo Server setup
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  // Apply Apollo middleware to Express
  app.use(
    '/api',
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.authorization }),
    }),
  );

  // Start the server
  app.listen(port, () => {
    console.log(`🚀 GraphQL Server running at http://localhost:${port}/api`);
  });
};

// Start the server.
startServer();
