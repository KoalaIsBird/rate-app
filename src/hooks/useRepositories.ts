import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

// interface RepositoriesQuery {
//   repositories: { edges: Array<{ node: Repository }> };
// }

const useRepositories = () => {
  const {
    loading,
    data,
    refetch: fetchRepositories
  } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  return {
    repositories: data ? data.repositories.edges.map(edge => edge.node) : undefined,
    loading,
    refetch: fetchRepositories
  };
};

export default useRepositories;
