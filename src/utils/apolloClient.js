import { ApolloClient, InMemoryCache} from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import { createHttpLink } from '@apollo/client/link/http';


const { apollo } = Constants.expoConfig?.extra;

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
});

const httpLink = createHttpLink({
  uri: apollo,
});

const createApolloClient = (authStorage) => {
  console.log(apollo);
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
    cache: cache,
    connectToDevTools: true
  });
};

export default createApolloClient;