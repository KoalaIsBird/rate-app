import { useQuery } from '@apollo/client';
import { GET_REPO } from '../graphql/queries';
import { RepositoryItem } from './RepositoryItem';
import { Text } from './Text';

export const ReviewItem = ({ id }: { id: string }) => {
  const { data, loading } = useQuery(GET_REPO, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network'
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!data?.repository?.url) {
    return <Text>Oops! This repository does not exist.</Text>;
  }

  return <RepositoryItem repo={data.repository} repoUrl={data.repository.url} />;
};
