// import { GraphQLClient } from 'graphql-request';

// export const client = new GraphQLClient('/api/graphql/');



import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache()
});

export default client;

