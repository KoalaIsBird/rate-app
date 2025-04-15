import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Text } from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to='/'>
          <Text style={styles.headerText}>Repositories</Text>
        </Link>
        <Link to='/signin'>
          <Text style={styles.headerText}>Sign In</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
