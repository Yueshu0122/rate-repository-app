// RepositoryAvatar.jsx
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const RepositoryAvatar = ({ avatarUrl }) => {
  return (
    <Image
      source={{ uri: avatarUrl }}
      style={styles.avatar}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
});

export default RepositoryAvatar;