import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries'

// const useRepositories = () => {
//   const [repositories, setRepositories] = useState();
//   const [loading, setLoading] = useState(false);

//   const fetchRepositories = async () => {
//     setLoading(true);

//     // Replace the IP address part with your own IP address!
//     const response = await fetch('http://192.168.1.6:5001/api/repositories');
//     const json = await response.json();

//     setLoading(false);
//     setRepositories(json);
//   };

//   useEffect(() => {
//     fetchRepositories();
//   }, []);

//   return { repositories, loading, refetch: fetchRepositories };
// };

// export default useRepositories;

const useRepositories = ({orderBy,searchKeyword}) => {

  const sortingOptions = {
    LATEST: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
    HIGHEST_RATED: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
    LOWEST_RATED: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
  };

    // 使用useQuery钩子来执行GraphQL查询
    const { loading, error, data, refetch } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network',
      variables: {
        orderBy: sortingOptions[orderBy].orderBy,
        orderDirection: sortingOptions[orderBy].orderDirection,
        searchKeyword: searchKeyword
      },
    });
  
    // 解构出repositories数据
    let repositories = null;

    if (!loading) {
      repositories = data?.repositories;
    }  

    //console.log(data)
  
    return { repositories, loading, error, refetch,orderBy };
  };
  
  export default useRepositories;