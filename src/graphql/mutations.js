import { gql } from '@apollo/client';

export const AUTHENTICATE_MUTATION = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;



export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
  createReview(review: $review) {
    repositoryId
  }
}
`;



export const DELETE_REVIEW = gql`
  mutation DeleteReview($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}
`;