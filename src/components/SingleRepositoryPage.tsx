import { useLazyQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { ReviewFieldsFragment } from '../__generated__/graphql';
import { GET_REVIEWS } from '../graphql/queries';
import { ItemSeparator } from './ItemSeparator';
import { ReviewItem } from './ReviewItem';
import { Text } from './Text';
import { Review } from './Review';

export const SingleRepositoryPage = () => {
  const [reviews, setReviews] = useState<ReviewFieldsFragment[]>([]);
  const { id } = useParams();
  const [getReviews, { data, loading }] = useLazyQuery(GET_REVIEWS, {fetchPolicy: 'cache-and-network'});

  useEffect(() => {
    if (!id) {
      return;
    }
    getReviews({ variables: { id: id } });
  }, [id]);

  useEffect(() => {
    if (!data?.repository?.reviews) {
      return;
    }
    setReviews(data.repository.reviews.edges.map(edge => edge.node));
  }, [data]);

  if (!id) {
    return <Text>Oops! This repository does not exist.</Text>;
  }

  return (
    <FlatList
      ListHeaderComponent={<ReviewItem id={id} />}
      data={reviews}
      renderItem={({ item }) => <Review review={item} />}
      ItemSeparatorComponent={() => <ItemSeparator />} />
  );
};
