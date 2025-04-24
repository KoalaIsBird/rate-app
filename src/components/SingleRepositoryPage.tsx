import { useLazyQuery, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { ReviewFieldsFragment } from '../__generated__/graphql';
import { GET_REPO, GET_REVIEWS } from '../graphql/queries';
import { ItemSeparator } from './ItemSeparator';
import { Text } from './Text';
import { Review } from './Review';
import { RepositoryItem } from './RepositoryItem';


const SingleRepositoryWithReviews = ({ id }: { id: string }) => {
  const { data, loading, error, fetchMore } = useQuery(GET_REPO, {
    variables: { repositoryId: id, first: 5 },
    fetchPolicy: 'cache-and-network'
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!data?.repository?.url) {
    return <Text>This repository does not exist {':('}</Text>;
  }

  const handleFetchMore = () => {
    if (loading || !data.repository?.reviews.pageInfo.hasNextPage) {
      return;
    }

    fetchMore({
      variables: {
        repositoryId: id,
        first: 5,
        after: data.repository.reviews.pageInfo.endCursor
      }
    });
  };

  return (
    <FlatList
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <RepositoryItem repo={data.repository} repoUrl={data.repository.url} />
      }
      data={data.repository.reviews.edges.map(e => e.node)}
      renderItem={({ item }) => <Review review={item} />}
      ItemSeparatorComponent={() => <ItemSeparator />}
    />
  );
};

export const SingleRepositoryPage = () => {
  const { id } = useParams();

  if (!id) {
    return <Text>This repository does not exist</Text>;
  }

  return <SingleRepositoryWithReviews id={id} />;
};
