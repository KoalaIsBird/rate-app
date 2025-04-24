import { useMutation, isApolloError } from '@apollo/client';
import { Formik, FormikHandlers, FormikProps, FormikValues } from 'formik';
import { useState, useEffect, ReactNode, ReactPortal } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { style } from 'twrnc';
import { ADD_REVIEW } from '../graphql/mutations';
import * as yup from 'yup';
import { Text } from './Text';

type FormValues = {
  repoOwnerName: string;
  repoName: string;
  rating: string;
  review: string;
};

interface FormInputProps {
  formik: FormikProps<FormValues>;
  fieldName: keyof FormValues;
  placeholder: string;
}

function FormInput({ formik, placeholder, fieldName }: FormInputProps) {
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
      />
      {formik.errors[fieldName] && formik.touched[fieldName] && (
        <Text style={style('text-red-600')}>{formik.errors[fieldName]}</Text>
      )}
    </>
  );
}

const AddReviewFormSchema = yup.object().shape({
  repoOwnerName: yup.string().required(),
  repoName: yup.string().required(),
  rating: yup.number().min(0).max(100).required(),
  review: yup.string()
});

export const ReviewPage = () => {
  const [addReview, { data }] = useMutation(ADD_REVIEW);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const alertError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 5000);
  };

  useEffect(() => {
    if (data?.createReview?.repositoryId) {
      navigate(`/repositories/${data?.createReview?.repositoryId}`);
    }
  }, [data]);

  const handleFormSubmit = async (values: FormValues) => {
    try {
      await addReview({
        variables: {
          ownerName: values.repoOwnerName,
          rating: parseInt(values.rating),
          repositoryName: values.repoName,
          text: values.review
        }
      });
    } catch (e) {
      if (e instanceof Error && isApolloError(e)) {
        alertError(e.message);
      }
      throw e;
    }
  };

  return (
    <Formik
      initialValues={{ repoOwnerName: '', repoName: '', rating: '', review: '' }}
      onSubmit={handleFormSubmit}
      validationSchema={AddReviewFormSchema}
    >
      {formik => (
        <View style={style('bg-white p-4 gap-2')}>
          {error && <Text style={style('text-red-600')}>{error}</Text>}
          <FormInput
            fieldName='repoOwnerName'
            formik={formik}
            placeholder="Repository owner's name"
          />
          <FormInput
            fieldName='repoName'
            formik={formik}
            placeholder='Name of the repository'
          />
          <FormInput
            fieldName='rating'
            formik={formik}
            placeholder='Rating from 0 to 100'
          />
          <FormInput fieldName='review' formik={formik} placeholder='Review' />
          <View style={style('bg-blue-500 p-2 rounded-sm')}>
            <Pressable onPress={formik.submitForm}>
              <Text style={style('text-white text-center font-bold')}>Submit</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};
