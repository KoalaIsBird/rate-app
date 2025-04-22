import { Button, Pressable, StyleSheet, TextInput, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import { Navigate, Route, Routes, useNavigate } from 'react-router-native';
import { SignIn } from './SignInForm';
import { ReviewFieldsFragment } from '../__generated__/graphql';
import { Text } from './Text';
import { format, parse } from 'date-fns';
import { wrap } from 'node:module';
import { SingleRepositoryPage } from './SingleRepositoryPage';
import { Form, Formik, FormikProps } from 'formik';
import Slider from '@react-native-community/slider';
import { isApolloError, useMutation } from '@apollo/client';
import { style } from 'twrnc';
import * as yup from 'yup';
import { object } from 'yup';
import { useEffect, useState } from 'react';
import { ADD_REVIEW } from '../graphql/mutations';
import { ReviewPage } from '../ReviewPage';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.appBackground
  }
});


const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='repositories/:id' element={<SingleRepositoryPage />} />
        <Route path='review' element={<ReviewPage />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;
