// RepositoryDetailView.jsx
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import Text from '../Text';
import useRepository from '../../hooks/useRepository';
import useReviews from '../../hooks/useReviews';
import ReviewItem from './ReviewItem';



const RepositoryDetailView = () => {
  const { id } = useParams(); // Extract the repository ID from the URL
  
  const { repository } = useRepository({id});

  const { reviews, handleFetchMore } = useReviews({id});

  const onEndReach = () => {
    handleFetchMore();
  };

  if (!repository) {
    return <Text>Loading...</Text>; // 或显示加载状态
  }

  if(!reviews){
    return <Text>Loading...</Text>; // 或显示加载状态
  } 


  const reviewNodes = reviews
    ? reviews.map(review => review.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem {...item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem
        {...repository}
        showGitHubButton={true}
      />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default RepositoryDetailView;