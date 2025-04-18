import { useApolloClient, useMutation } from '@apollo/client';
import useAuthStorage from './useAuthStorage';
import { SIGNIN } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

interface SignInFields {
  username: string;
  password: string;
}

export const useSignIn = () => {
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const [mutate] = useMutation(SIGNIN);

  const authStorage = useAuthStorage();

  const signIn = async ({ username, password }: SignInFields) => {
    const { data, errors } = await mutate({
      variables: { username: username, password: password }
    });

    if (errors) {
      throw errors;
    }

    if (data === null || data === undefined || !data.authenticate) {
      throw new Error('No data here, weird');
    }

    await authStorage.setAccessToken(data.authenticate.accessToken);

    apolloClient.resetStore();
    navigate('/');

    return data;
  };

  return signIn;
};
