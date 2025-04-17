import { useNavigate } from 'react-router-native';
import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client';

export const useLogout = () => {
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const apolloClient = useApolloClient();

  const logout = () => {
    authStorage.removeAccessToken().then(() => {
      apolloClient.resetStore().then(() => {
        navigate('/');
      });
    });
  };

  return logout;
};
