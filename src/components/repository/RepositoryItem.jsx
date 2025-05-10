// RepositoryItem.jsx
import React from 'react';
import { View, StyleSheet,Text, TouchableOpacity } from 'react-native';

import RepositoryAvatar from './RepositoryAvatar';
import RepositoryInfo from './RepositoryInfo';
import RepositoryMeta from './RepositoryMeta';
import * as Linking from 'expo-linking';
const RepositoryItem = ({
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  reviewCount,
  ratingAverage,
  ownerAvatarUrl,
  url, 
  showGitHubButton = false,
}) => {

  const handleGitHubPress = () => {
    Linking.openURL(url);
  };
  
  return (
    
    <View style={styles.container}>
      <View style={styles.row}>
        <RepositoryAvatar avatarUrl={ownerAvatarUrl} />
        <RepositoryInfo
          name={fullName}
          description={description}
          language={language}
        />
      </View>

      <RepositoryMeta
        stars={stargazersCount}
        forks={forksCount}
        reviews={reviewCount}
        rating={ratingAverage}
      />

     {/* {showGitHubButton && (<Button title="Open in GitHub" onPress={handleGitHubPress} />)} */}
     {showGitHubButton && (
        <TouchableOpacity
          style={styles.githubButton}
          onPress={handleGitHubPress}
          activeOpacity={0.8} // 点击反馈效果
        >
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  githubButton: {
    backgroundColor: '#007BFF', // 蓝色背景
    borderRadius: 2, // 四个角加弧度
    paddingVertical: 10, // 垂直内边距
    paddingHorizontal: 16, // 水平内边距
    marginTop: 12, // 与上方内容间距
    alignItems: 'center', // 文字水平居中
  },
  buttonText: {
    color: '#fff', // 白色文字
    fontSize: 14, // 字体大小
    fontWeight: '600', // 字体加粗
  },
});

export default RepositoryItem;