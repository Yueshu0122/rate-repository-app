// utils/authStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  /**
   * Retrieve the access token from AsyncStorage.
   * @returns {Promise<string | null>} - The stored access token or null.
   */
  getAccessToken = async () => {
    const key = `${this.namespace}_accessToken`;
    const value = await AsyncStorage.getItem(key);

    return value ? JSON.parse(value) : null;
  };

  /**
   * Store the access token in AsyncStorage.
   * @param {string} accessToken - The access token to store.
   * @returns {Promise<void>}
   */
  setAccessToken = async (accessToken) => {
    const key = `${this.namespace}_accessToken`;
    await AsyncStorage.setItem(key, JSON.stringify(accessToken));
  };

  /**
   * Remove the access token from AsyncStorage.
   * @returns {Promise<void>}
   */
  removeAccessToken = async () => {
    const key = `${this.namespace}_accessToken`;
    await AsyncStorage.removeItem(key);
  };
}

export default AuthStorage;