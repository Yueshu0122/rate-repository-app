import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns'; 
const ReviewItem = ({ rating, createdAt, text, user }) => {

    const formattedDate = format(new Date(createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.card}>
      {/* Rating 圆形区域 */}
      <View style={styles.ratingCircle}>
        <Text style={styles.ratingText}>{rating}</Text>
      </View>

      {/* 右侧内容区域 */}
      <View style={styles.contentContainer}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.timestamp}>{formattedDate}</Text>
        <Text style={styles.commentText}>{text}</Text>
      </View>
    </View>
  );
};

// 样式定义
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', // 横向排列
    alignItems: 'flex-start', // 顶部对齐
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
  ratingCircle: {
    width: 40,
    height: 40,
    borderRadius: 20, // 50% of width/height
    backgroundColor: 'transparent', // 空心圆
    borderColor: '#007BFF', // 蓝色边框
    borderWidth: 2, // 边框宽度
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12, // 与右侧内容间距
  },
  ratingText: {
    color: '#007BFF', // 蓝色文字
    fontSize: 14,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1, // 占据剩余空间
    justifyContent: 'flex-start', // 从上到下排列
    alignItems: 'flex-start', // 首字符对齐
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default ReviewItem;