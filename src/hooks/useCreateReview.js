import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

export const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    try {

        console.log({ownerName, 
            repositoryName, 
            rating, 
            text})

      const numericRating = Number(rating);

      const { data } = await mutate({
        variables: {
          review: {
            ownerName, 
            repositoryName, 
            rating:numericRating, 
            text,
          },
        },
      });


      console.log(data?.createReview?.repositoryId)
      return data?.createReview?.repositoryId; // Return the mutation result
    } catch (e) {
      console.error('Create failed:', e);
      throw e; // Propagate the error to the component
    }
  };

  return [createReview, result];
};