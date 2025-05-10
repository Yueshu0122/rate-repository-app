// AppBar.jsx
import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import AppBarTab from './AppBarTab';
import Constants from 'expo-constants';
import theme from '../theme';
import { GET_LOGIN_USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.appBar.backgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { height: 1 },
  },
  scrollView: {
    alignSelf: 'stretch',
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const AppBar = () => {

    const { loading, error, data, refetch } = useQuery(GET_LOGIN_USER, {
          fetchPolicy: 'cache-and-network',
          variables: { includeReviews: false},
    });
      
    // 解构出repositories数据
    const user = data?.me;

    console.log(user);

    const handleLogOut = () => {
        console.log('log outttttttt')
    }

  return (
<View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabContainer}
        style={styles.scrollView}
      >
        <AppBarTab label="Repositories" to="/" />
        {user && <AppBarTab label="Create a review" to="/create" />}
        {!user && <AppBarTab label="Sign in" to="/login" />}
        {user && <AppBarTab label="My reviews" to="/reviews"/>}
        {user && <AppBarTab label="Sign out" to="/logout" />}
      </ScrollView>
    </View>
  );
};

export default AppBar;