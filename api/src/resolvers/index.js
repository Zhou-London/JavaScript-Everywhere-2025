//Resolvers for GraphQL schema

const Query = require('./query');
const Mutation = require('./mutation');
const { DateTimeResolver } = require('graphql-scalars'); //graphql-iso-date is dead

const resolvers = {
  Query,
  Mutation,
  DateTime: DateTimeResolver,
};

module.exports = resolvers;
