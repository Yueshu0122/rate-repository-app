import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import MyReviewItem from './MyReviewItem';
import { useQuery } from '@apollo/client';
import { GET_LOGIN_USER } from '../graphql/queries';


// Styles
const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
  });


const MyReviews = () => {
   const { loading, error, data, refetch } = useQuery(GET_LOGIN_USER, {
            fetchPolicy: 'cache-and-network',
            variables: { includeReviews: true},
      });
          
    // 解构出repositories数据
    const reviews = data?.me?.reviews?.edges;
    // console.log(reviews)


    let nodes = reviews ? reviews.map(review => review.node) :[]
  
    nodes = nodes ? nodes.map(node => ({
        fullName: node.repository.fullName,
        createdAt: node.createdAt,
        text: node.text,
        id: node.id,
        rating: node.rating,
        repositoryId: node.repositoryId
    })) : [];

    // console.log(nodes)

    return (
      <FlatList
        data={nodes}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
            <MyReviewItem {...item} refetch={refetch} />
        )}
      />
    );
  };
  
  export default MyReviews;