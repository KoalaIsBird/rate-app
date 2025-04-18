import { FlatList, StyleSheet, View } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import { RepositoryItem } from './RepositoryItem';
import { GetRepositoriesQuery } from '../__generated__/graphql';

const styles = StyleSheet.create({
  separator: {
    height: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

interface Props {
  repositories:
    | GetRepositoriesQuery['repositories']['edges'][number]['node'][]
    | undefined;
}

export const RepositoryListContainer = ({ repositories }: Props) => {
  const repositoryNodes = repositories ? repositories : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repo={item} />}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
