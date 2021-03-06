import { ApolloServer, gql, IResolverObject } from 'apollo-server';
import path from 'path';
import fs from 'fs';

// Reading the entire content of the file because it's small
const fileContent = fs.readFileSync(path.join(__dirname, `../sampleData.json`), 'utf8');
const { clients } = JSON.parse(fileContent);

// The GraphQL schema in string form
const typeDefs = gql`
  type Client {
    id: ID,
    age: Int,
    name: String,
    additionalInfo: AdditionalInfo
  }
  type AdditionalInfo {
    gender: String,
    company: String,
    email: String,
    phone: String,
    address: String
  }
  type Query {
    clients: [Client],
    client(id: ID!): Client
  }
`;

// The resolvers
const resolvers = {
  Query: {
    clients: (): Array<object> => clients,
    client: (_: void, { id }: { id: string; }): object => {
      const client = clients.find((client: { id: string; }) => client.id === id);
      if (!client) {
        throw new Error(`Couldn't find client with id ${id}`);
      }
      return client;
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

