import { useQuery } from '@apollo/client';
import { Repository } from '../types';
import { GET_REPOSITORIES } from '../graphql/queries';

interface RepositoriesQuery {
  repositories: { edges: Array<{ node: Repository }> };
}

const useRepositories = () => {
  const {
    loading,
    data,
    refetch: fetchRepositories
  } = useQuery<RepositoriesQuery>(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  return {
    repositories: data ? data.repositories : undefined,
    loading,
    refetch: fetchRepositories
  };
};

export default useRepositories;
