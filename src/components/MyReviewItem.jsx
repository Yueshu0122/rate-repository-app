import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { format } from 'date-fns'; 
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const MyReviewItem = ({ id,rating,createdAt, text,fullName, repositoryId,refetch }) => {

    const formattedDate = format(new Date(createdAt), 'dd.MM.yyyy');

    const navigate = useNavigate();

    const [mutate, result] = useMutation(DELETE_REVIEW);

    const handleDelete = () => {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this review?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Delete',
            onPress: async () => {
              console.log('Delete Review:');
              try {
                await mutate({
                  variables: { deleteReviewId: id }
                });
                refetch();
              } catch (error) {
                console.error('Delete failed:', error);
                Alert.alert('Error', 'Failed to delete review.');
              }
            },
            style: 'destructive'
          }
        ],
        { cancelable: false }
      );
    };
    
  return (    
    <View style={styles.card}>
      {/* Rating 圆形区域 */}
      <View style={styles.ratingCircle}>
        <Text style={styles.ratingText}>{rating}</Text>
      </View>

      {/* 右侧内容区域 */}
      <View style={styles.contentContainer}>
        <Text style={styles.username}>{fullName}</Text>
        <Text style={styles.timestamp}>{formattedDate}</Text>
        <Text style={styles.commentText}>{text}</Text>
      </View>
      {/* 按钮组 - 位于卡片底部 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => navigate(`/repo/${repositoryId}`)}
        >
          <Text style={styles.viewButtonText}>View Repository</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>Delete Review</Text>
        </TouchableOpacity>
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
    position: 'relative',
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
    marginBottom: 50, 
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
  buttonContainer: {
    position: 'absolute',
    bottom: 12,
    right: 10,
    flexDirection: 'row',
    gap: 8,
  },
  viewButton: {
    backgroundColor: '#007BFF',
    borderRadius: 4,
    paddingVertical: 13,
    paddingHorizontal: 35,
  },
  viewButtonText: {
    color: '#fff', // 白色文字
    fontSize: 15,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    borderRadius: 4,
    paddingVertical: 13,
    paddingHorizontal: 35,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default MyReviewItem;