const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const path = require('path');
const fs = require('fs');
const { find } = require('lodash');

// Reading the entire content of the file because it's small
const fileContent = fs.readFileSync(path.join(__dirname, `../sampleData.json`), 'utf8');
const { clients } = JSON.parse(fileContent);

// The GraphQL schema in string form
const typeDefs = `
  type Query { clients: [Client], fullInfo(id: ID!): FullInfo }
  type Client { id: ID, age: Int, name: String }
  type AdditionalInfo { gender: String, company: String, email: String, phone: String, address: String }
  type FullInfo { id: ID, age: Int, name: String, additionalInfo: AdditionalInfo }
`;

// The resolvers
const resolvers = {
  Query: {
    clients: () => clients,
    fullInfo: (_, { id }) => {
      const client = clients.find(client => client.id === id);
      if (!client) {
        throw new Error(`Couldn't find client with id ${id}`);
      }
      return client;
    }
  },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

// not having cors enabled will cause an access control error
app.use(cors());

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(5000, () => {
  console.log('Go to http://localhost:5000/graphiql to run queries!');
});

