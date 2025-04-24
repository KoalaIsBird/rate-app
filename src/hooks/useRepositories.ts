import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { AllRepositoriesOrderBy, OrderDirection } from '../__generated__/graphql';

interface Props {
  orderDirection: OrderDirection;
  orderBy: AllRepositoriesOrderBy;
  searchKeyword: string;
}

const useRepositories = (variables: Props) => {
  const { loading, data, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { first: 10, ...variables }
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: { first: 10, after: data.repositories.pageInfo.endCursor, ...variables }
    });
  };

  return {
    repositories: data ? data.repositories.edges.map(edge => edge.node) : undefined,
    loading,
    fetchMore: handleFetchMore,
    ...result
  };
};

export default useRepositories;
