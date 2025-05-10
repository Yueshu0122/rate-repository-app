// RepositoryInfo.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../Text';

const RepositoryInfo = ({ name, description, language }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{name}</Text>
      <Text numberOfLines={2} style={styles.description}>
        {description}
      </Text>
      {language && <Text style={styles.languageTag}>{language}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  languageTag: {
    fontSize: 12,
    backgroundColor: '#0366d6', // primary color
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2, // 圆角矩形的圆角半径
    alignSelf: 'flex-start',
    overflow: 'hidden', // 确保标签内的内容不会超出圆角范围
  },
});

export default RepositoryInfo;