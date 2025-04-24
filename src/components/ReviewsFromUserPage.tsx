import { ApolloQueryResult, useMutation, useQuery } from '@apollo/client';
import { Text } from './Text';
import { ME } from '../graphql/queries';
import { Review } from './Review';
import { Alert, FlatList, Pressable, View } from 'react-native';
import { ItemSeparator } from './ItemSeparator';
import { GetMeQuery, ReviewFieldsFragment } from '../__generated__/graphql';

import { style } from 'twrnc';
import { useNavigate } from 'react-router-native';
import { gql } from '../__generated__';

const DELETE_REVIEW = gql(`
    mutation DeleteReview($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}
    `);

interface ReviewWithOptionsProps {
  review: ReviewFieldsFragment;
  refetchReviews: () => Promise<ApolloQueryResult<GetMeQuery>>;
}

const ReviewWithOptions = ({ review, refetchReviews }: ReviewWithOptionsProps) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    variables: { deleteReviewId: review.id }
  });

  const handleDeleteButtonPress = () => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: handleDelete }
    ]);
  };

  const handleDelete = () => {
    deleteReview().then(() => refetchReviews());
  };

  return (
    <>
      <Review review={review} repoNameInsteadOfAuthorName={true} />
      <View style={style('flex-row p-4 bg-white justify-around')}>
        <Pressable onPress={() => navigate(`/repositories/${review.repositoryId}`)}>
          <Text style={style('p-4 bg-blue-500 text-white font-bold rounded-md')}>
            View Repository
          </Text>
        </Pressable>
        <Pressable onPress={handleDeleteButtonPress}>
          <Text style={style('p-4 bg-red-500 text-white font-bold rounded-md')}>
            Delete Review
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export const ReviewsFromUserPage = () => {
  const { data, loading, error, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network'
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading page: {error.message}</Text>;
  }

  if (!data?.me?.reviews) {
    return <Text>No reviews from you {':('}</Text>;
  }

  return (
    <FlatList
      data={data.me.reviews.edges.map(e => e.node)}
      renderItem={({ item }) => (
        <ReviewWithOptions review={item} refetchReviews={refetch} />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};
