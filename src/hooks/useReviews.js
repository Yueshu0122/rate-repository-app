import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../graphql/queries'

const useReviews = ({id}) => {

    const { loading, error, data , fetchMore} = useQuery(GET_REVIEWS, {
        variables: {id:id,first:4},
        fetchPolicy: 'network-only',
        skip: !id,
        onError: (err) => {
            console.error('GraphQL Error:', err);
          },
    });

    // console.log(data?.repository?.reviews?.pageInfo)


    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository?.reviews?.pageInfo.hasNextPage;
    
        if (!canFetchMore) {
          return;
        }
    
        fetchMore({
          variables: {
            after: data.repository.reviews.pageInfo.endCursor,
            id:id,
            first:4
          },
        });
    };
    

    let reviews = null;

    if (!loading) {
        reviews = data?.repository?.reviews?.edges;
    }
    
    return { reviews, loading, error,handleFetchMore };
  };
  
  export default useReviews;