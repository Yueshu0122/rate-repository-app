// hooks/useSignIn.js
import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE_MUTATION } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

export const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient(); // Get Apollo Client instance
  const [mutate, result] = useMutation(AUTHENTICATE_MUTATION);

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: {
          credentials: {
            username,
            password,
          },
        },
      });

      // Only proceed if the access token is present
      if (data?.authenticate?.accessToken) {
        await authStorage.setAccessToken(data.authenticate.accessToken); // Store token
        await apolloClient.resetStore(); // Reset Apollo cache
      }

      return { data }; // Return the mutation result
    } catch (e) {
      console.error('Sign-in failed:', e);
      throw e; // Propagate the error to the component
    }
  };

  return [signIn, result];
};