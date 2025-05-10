import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries'
import { useState, useEffect } from 'react';



const useRepository = ({id}) => {

    const { loading, error, data , refetch} = useQuery(GET_REPOSITORY, {
        variables: {id:id},
        fetchPolicy: 'cache-and-network',
        skip: !id,
        onError: (err) => {
            console.error('GraphQL Error:', err);
          },
    });
    

    let repository = null;

    if (!loading) {
        repository = data?.repository;
    }    
    
    return { repository, loading, error };
  };
  
  export default useRepository;