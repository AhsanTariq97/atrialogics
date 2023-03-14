import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const client = new ApolloClient({

    uri: 'https://api.atrialogics.io/graphql',
  
    cache: new InMemoryCache(),
  
  });