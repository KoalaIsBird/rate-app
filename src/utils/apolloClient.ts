import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import AuthStorage from './authStorage';

// You might need to change this depending on how you have configured the Apollo Server's URI
const apolloUri = process.env.EXPO_PUBLIC_APOLLO_URI

const httpLink = createHttpLink({
  uri: apolloUri,
});


const createApolloClient = (authStorage: AuthStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;