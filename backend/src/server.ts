import { ApolloServer, gql } from 'apollo-server';
import path from 'path';
import fs from 'fs';

// Reading the entire content of the file because it's small
const fileContent = fs.readFileSync(path.join(__dirname, `../sampleData.json`), 'utf8');
const { clients } = JSON.parse(fileContent);

// The GraphQL schema in string form
const typeDefs = gql`
  type Client {
    id: ID
    age: Int
    name: String
    additionalInfo: AdditionalInfo
  }
  type AdditionalInfo {
    gender: String
    company: String
    email: String
    phone: String
    address: String
  }
  type Query {
    clients: [Client]
    client(id: ID!): Client
  }
`;
interface IClient {
  id: string;
  age: number;
  name: string;
  additionalInfo: {
    gender: String;
    company: String;
    email: String;
    phone: String;
    address: String;
  };
}
interface IClientInput {
  id: string;
}

// The resolvers
const resolvers = {
  Query: {
    clients: (): IClient[] => clients,
    client: (_: void, { id }: IClientInput): IClient => {
      const client = clients.find((client: IClient) => client.id === id);
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

