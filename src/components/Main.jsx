import { Text, StyleSheet, View } from 'react-native';
import RepositoryList from './repository/RepositoryListOg'; 
import AppBar from './AppBar'; 
import SignIn from './SignIn';
import SignOut from './SignOut';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryDetailView from './repository/RepositoryDetailView'; 
import theme from '../theme';
import Review from './Review'
import RepositoryListContainer from './repository/RepositoryListContainer';
import MyReviews from './MyReviews'

const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.mainBackground,
      flexGrow: 1,
      flexShrink: 1,
    },
  });

const Main = () => {
  return (
    <View style={styles.container}>
        <AppBar/>
        <Routes>
            <Route path="/" element={<RepositoryListContainer />} />   
            {/* <Route path="/" element={<RepositoryList />} /> */}
            <Route path="/login" element={<SignIn />} />
            <Route path='/logout' element={<SignOut/>}/>
            <Route path="/repo/:id" element={<RepositoryDetailView />} />
            <Route path="/create" element={<Review/>}/>
            <Route path="/reviews" element={<MyReviews/>}/>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes> 
    </View>
  );
};

export default Main;