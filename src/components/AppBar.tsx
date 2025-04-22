import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Text } from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';
import useAuthStorage from '../hooks/useAuthStorage';
import { useState } from 'react';
import { useLogout } from '../hooks/useLogout';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.headerColor
  },
  headerText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
    padding: 12,
    fontSize: theme.fontSizes.subheading
  }
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const logout = useLogout();
  const { data } = useQuery(ME);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to='/'>
          <Text style={styles.headerText}>Repositories</Text>
        </Link>
        {data?.me && (
          <Link to='/review'>
            <Text style={styles.headerText}>Review</Text>
          </Link>
        )}
        {data?.me ? (
          <Pressable onPress={logout}>
            <Text style={styles.headerText}>Sign Out</Text>
          </Pressable>
        ) : (
          <Link to='/signin'>
            <Text style={styles.headerText}>Sign In</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
