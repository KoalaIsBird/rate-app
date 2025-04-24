import { useMutation, isApolloError } from '@apollo/client';
import { Formik, FormikHandlers, FormikProps, FormikValues } from 'formik';
import { useState, useEffect, ReactNode, ReactPortal } from 'react';
import { View, TextInput, Pressable, TextInputProps } from 'react-native';
import { useNavigate } from 'react-router-native';
import { style } from 'twrnc';
import { ADD_REVIEW, SIGNIN } from '../graphql/mutations';
import * as yup from 'yup';
import { Text } from './Text';
import { gql } from '../__generated__';
import { log } from 'node:console';
import useAuthStorage from '../hooks/useAuthStorage';
import { useSignIn } from '../hooks/useSignIn';

type FormValues = {
  username: string;
  password: string;
  confirmPassword: string;
};

interface FormInputProps extends TextInputProps {
  formik: FormikProps<FormValues>;
  fieldName: keyof FormValues;
  placeholder: string;
}

function FormInput({ formik, placeholder, fieldName, ...props }: FormInputProps) {
  return (
    <>
      <TextInput
        onChangeText={formik.handleChange(fieldName)}
        onBlur={formik.handleBlur(fieldName)}
        value={formik.values[fieldName]}
        placeholder={placeholder}
        style={[
          style('border border-gray-400 rounded-sm'),
          formik.errors[fieldName] && formik.touched[fieldName]
            ? style('border-red-300')
            : null
        ]}
        {...props}
      />
      {formik.errors[fieldName] && formik.touched[fieldName] && (
        <Text style={style('text-red-600')}>{formik.errors[fieldName]}</Text>
      )}
    </>
  );
}

const AddReviewFormSchema = yup.object().shape({
  username: yup.string().min(5).max(30).required('Username is required'),
  password: yup.string().min(5).max(50).required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')])
    .required('Password confirmation is required')
});

const ADD_USER = gql(`
  mutation addUser($user: CreateUserInput! ) {
  createUser(user: $user) {
    username
  }
}
  `);

export const SignUpPage = () => {
  const [addUser, { data }] = useMutation(ADD_USER);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const signIn = useSignIn();

  const alertError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 5000);
  };

  const handleFormSubmit = async (values: FormValues) => {
    try {
      await addUser({
        variables: {
          user: { username: values.username, password: values.password }
        }
      });
    } catch (e) {
      if (e instanceof Error && isApolloError(e)) {
        alertError(e.message);
      }
      throw e;
    }
    await signIn({ username: values.username, password: values.password });
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      onSubmit={handleFormSubmit}
      validationSchema={AddReviewFormSchema}
    >
      {formik => (
        <View style={style('bg-white p-4 gap-2')}>
          {error && <Text style={style('text-red-600')}>{error}</Text>}
          <FormInput fieldName='username' formik={formik} placeholder='Username' />
          <FormInput
            secureTextEntry={true}
            fieldName='password'
            formik={formik}
            placeholder='Password'
          />
          <FormInput
            secureTextEntry={true}
            fieldName='confirmPassword'
            formik={formik}
            placeholder='Confirm password'
          />
          <View style={style('bg-blue-500 p-2 rounded-sm')}>
            <Pressable onPress={formik.submitForm}>
              <Text style={style('text-white text-center font-bold')}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};
