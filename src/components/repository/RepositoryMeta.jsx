// RepositoryMeta.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../Text'; // Reuse your custom Text component

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const RepositoryMeta = ({ stars, forks, reviews, rating }) => {
  return (
    <View style={styles.metaContainer}>
      <View style={styles.metaItem}>
        <Text size="small" style={styles.metaValue}>{formatCount(stars)} </Text>
        <Text size="small" variant="secondary" style={styles.metaLabel}>
          Stars
        </Text>
      </View>

      <View style={styles.metaItem}>
        <Text size="small" style={styles.metaValue}>{formatCount(forks)}</Text>
        <Text size="small" variant="secondary" style={styles.metaLabel}>
          Forks
        </Text>
      </View>

      <View style={styles.metaItem}>
        <Text size="small" style={styles.metaValue}>{reviews}</Text>
        <Text size="small" variant="secondary" style={styles.metaLabel}>
          Reviews
        </Text>
      </View>

      <View style={styles.metaItem}>
        <Text size="small" style={styles.metaValue}>{rating || 0}</Text>
        <Text size="small" variant="secondary" style={styles.metaLabel}>
          Rating
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    metaContainer: {
        flexDirection: 'row', // 水平排列各个数据项
        justifyContent: 'space-between', // 数据项之间保持间距
        marginTop: 6,
      },
      metaItem: {
        alignItems: 'center', // 垂直居中对齐
        flex: 1, // 让每个数据项占据相等的空间
        padding: 4, // 内边距以增加可读性
      },
      metaLabel: {
        fontSize: 12,
        color: '#555',
        marginBottom: 4, // 标签与值之间的间距
        textAlign: 'center', // 文本居中
      },
      metaValue: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8 // 数据标粗
      },
});

export default RepositoryMeta;