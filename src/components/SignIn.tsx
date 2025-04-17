import { useFormik } from 'formik';
import { Text } from './Text';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import { useSignIn } from '../hooks/useSignIn';
import { ApolloError, isApolloError } from '@apollo/client';
import { useState } from 'react';

const styles = StyleSheet.create({
  formInput: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'theme.colors.textSecondary',
    padding: 16
  }
});

const formSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});

type FormValues = yup.InferType<typeof formSchema>;

const SignIn = () => {
  const signIn = useSignIn();
  const [signInError, setSignInError] = useState('');

  const handleSubmit = async (values: FormValues) => {
    const { username, password } = values;
    try {
      const data = await signIn({ username, password });
    } catch (e) {
      if (e instanceof ApolloError) {
        notificateError(e);
        return
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

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: handleSubmit,
    validationSchema: formSchema
  });

  return (
    <View style={{ padding: 16, gap: 20, backgroundColor: 'white' }}>
      {signInError && <Text style={{ color: theme.colors.error }}>{signInError}</Text>}
      <TextInput
        style={[
          styles.formInput,
          formik.touched.username && formik.errors.username
            ? { borderColor: theme.colors.error }
            : { borderColor: theme.colors.textSecondary }
        ]}
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.username}</Text>
      )}

      <TextInput
        secureTextEntry
        style={[
          styles.formInput,
          formik.touched.password && formik.errors.password
            ? { borderColor: theme.colors.error }
            : { borderColor: theme.colors.textSecondary }
        ]}
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.password}</Text>
      )}

      <Pressable
        onPress={e => formik.handleSubmit()}
        style={{
          backgroundColor: theme.colors.primary,
          justifyContent: 'center',
          flexDirection: 'row',
          padding: 16,
          borderRadius: 4
        }}
      >
        <Text style={{ color: 'white' }}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
