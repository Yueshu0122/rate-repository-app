// hooks/useSignOut.js
import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client';

/**
 * useSignOut Hook
 * - Removes the access token from storage
 * - Resets Apollo Client's cache
 * - Ensures the order: remove token before resetting store
 */
export const useSignOut = () => {
  const authStorage = useAuthStorage(); // 自定义 Hook，用于访问令牌存储
  const apolloClient = useApolloClient(); // 获取 Apollo Client 实例

  const signOut = async () => {
    try {
      // 1. 先从存储中删除访问令牌
      await authStorage.removeAccessToken();

      // 2. 再重置 Apollo Client 缓存
      await apolloClient.resetStore(); // 会重新执行所有活跃的查询（如 `me` 查询）
    } catch (error) {
      console.error('Sign-out failed:', error);
      throw error; // 可选：将错误抛出给调用者处理
    }
  };

  return [signOut]; // 返回一个包含 signOut 函数的数组
};