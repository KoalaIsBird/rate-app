import { ApolloError } from '@apollo/client';
import { useState } from 'react';
import { useSignIn } from '../hooks/useSignIn';
import { FormValues, SignInContainer } from './SignInContainer';

export const SignIn = () => {
  const signIn = useSignIn();
  const [signInError, setSignInError] = useState('');

  const handleSubmit = async (values: FormValues) => {
    const { username, password } = values;
    try {
      const data = await signIn({ username, password });
    } catch (e) {
      if (e instanceof ApolloError) {
        notificateError(e);
        return;
      }
      throw e;
    }

    function notificateError(e: ApolloError) {
      setSignInError(e.message);
      setTimeout(() => {
        setSignInError('');
      }, 2000);
    }
  };

  return <SignInContainer onSubmit={handleSubmit} signInError={signInError} />;

};
