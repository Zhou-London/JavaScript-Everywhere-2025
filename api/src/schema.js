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

module.exports = typeDefs;
