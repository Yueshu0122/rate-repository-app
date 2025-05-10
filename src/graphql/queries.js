import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String) {
  repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
    edges {
      node {
        fullName
        description
        language
        ownerAvatarUrl
        stargazersCount
        forksCount
        reviewCount
        ratingAverage
        id
      }
    }
  }
}
`;

export const GET_LOGIN_USER = gql`
  query GetLoginUser($includeReviews: Boolean!) {
      me {
      reviews @include(if: $includeReviews){
      edges {
        node {
          createdAt
          text
          repository {
            fullName
          }
          id
          rating
          repositoryId
        }
      }
    }
        id
        username
      }
  }
`;


export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      reviewCount
      ratingAverage
      ownerAvatarUrl
      url
    }
  }
`;


// export const GET_REVIEWS = gql`
//   query GetReviews($id: ID!) {
//     repository(id: $id) {
//       id
//       fullName
//       reviews {
//         edges {
//           node {
//             id
//             text
//             rating
//             createdAt
//             user {
//               id
//               username
//             }
//           }
//         }
//       }
//     }
//   }
// `;

export const GET_REVIEWS = gql`
  query GetReviews($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      fullName
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;


