import { FlatList, StyleSheet, TextInput } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import { RepositoryItem } from './RepositoryItem';
import {
  AllRepositoriesOrderBy,
  GetRepositoriesQuery,
  OrderDirection
} from '../__generated__/graphql';
import { ItemSeparator } from './ItemSeparator';
import { Picker } from '@react-native-picker/picker';
import { ReactElement, ReactNode, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { style } from 'twrnc';

export const styles = StyleSheet.create({
  separator: {
    height: 10
  }
});

interface Props {
  repositories:
    | GetRepositoriesQuery['repositories']['edges'][number]['node'][]
    | undefined;
  listHeader: ReactElement;
  onEndReach: () => void;
}

export const RepositoryListContainer = ({
  repositories,
  listHeader,
  onEndReach
}: Props) => {
  const repositoryNodes = repositories ? repositories : [];

  return (
    <FlatList
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={listHeader}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repo={item} />}
    />
  );
};

const RepositoryList = () => {
  const [sortState, setSortState] = useState<{
    orderBy: AllRepositoriesOrderBy;
    orderDirection: OrderDirection;
  }>({ orderBy: AllRepositoriesOrderBy.CreatedAt, orderDirection: OrderDirection.Asc });

  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword] = useDebounce(keyword, 500);

  const { repositories, fetchMore } = useRepositories({
    orderDirection: sortState.orderDirection,
    orderBy: sortState.orderBy,
    searchKeyword: debouncedKeyword
  });

  const onEndReach = () => {
    console.log('onendreach')
    fetchMore()
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      listHeader={
        <>
          <TextInput
            style={style('pl-4')}
            placeholder='Search Keyword'
            value={keyword}
            onChangeText={setKeyword}
          />
          <Picker selectedValue={sortState} onValueChange={v => setSortState(v)}>
            <Picker.Item
              label='Latest repositories'
              value={{
                orderBy: AllRepositoriesOrderBy.CreatedAt,
                orderDirection: OrderDirection.Asc
              }}
            />
            <Picker.Item
              label='Highest rated repositories'
              value={{
                orderBy: AllRepositoriesOrderBy.RatingAverage,
                orderDirection: OrderDirection.Desc
              }}
            />
            <Picker.Item
              label='Lowest rated repositories'
              value={{
                orderBy: AllRepositoriesOrderBy.RatingAverage,
                orderDirection: OrderDirection.Asc
              }}
            />
          </Picker>
        </>
      }
    />
  );
};

export default RepositoryList;
