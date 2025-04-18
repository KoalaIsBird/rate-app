import { useState } from 'react';
import { Text, TextInput, Pressable, View } from 'react-native';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import RepositoryList, { RepositoryListContainer } from '../components/RepositoryList';
import { SignInContainer } from '../components/SignInContainer';

interface Props {
  onSubmit: (info: { username: string; password: string }) => void;
}

const Form = ({ onSubmit }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit({ username, password });
  };

  return (
    <View>
      <View>
        <TextInput
          value={username}
          onChangeText={text => setUsername(text)}
          placeholder='Username'
        />
      </View>
      <View>
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder='Password'
        />
      </View>
      <View>
        <Pressable onPress={handleSubmit}>
          <Text>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
};

describe('Form', () => {
  it('calls function provided by onSubmit prop after pressing the submit button', () => {
    const onSubmit = jest.fn();
    render(<Form onSubmit={onSubmit} />);

    fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
    fireEvent.press(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalled();

    // onSubmit.mock.calls[0][0] contains the first argument of the first call
    expect(onSubmit.mock.calls[0][0]).toEqual({
      username: 'kalle',
      password: 'password'
    });
  });
});

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd'
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4'
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd'
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4'
            },
            cursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ=='
          }
        ]
      };

      render(
        <RepositoryListContainer
          repositories={repositories.edges.map(edge => edge.node)}
        />
      );

      const [firstRepositoryItem, secondRepositoryItem] =
        screen.getAllByTestId('repositoryItem');

      expect(firstRepositoryItem).toBeDefined();
      expect(firstRepositoryItem).toHaveTextContent(new RegExp('.*jaredpalmer/formik.*'));
      expect(firstRepositoryItem).toHaveTextContent(new RegExp('.*TypeScript.*'));

      expect(secondRepositoryItem).toBeDefined();
      expect(secondRepositoryItem).toHaveTextContent(
        new RegExp('.*async-library/react-async.*')
      );
      expect(secondRepositoryItem).toHaveTextContent(new RegExp('.*JavaScript.*'));
    });
  });
});

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn()

      render(<SignInContainer onSubmit={onSubmit} signInError={''} />)
     
      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle')
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password')
      fireEvent.press(screen.getByText('Sign In'))

      await waitFor(() => {
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password'
        })
      });
    });
  });
});