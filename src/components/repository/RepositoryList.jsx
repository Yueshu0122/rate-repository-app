import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';

// Styles
const styles = StyleSheet.create({
  headerContainer: {
    padding: 8,
    backgroundColor: '#f9f9f9',
    height: 60, 
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  sortButtonContainer: {
    flex: 1,
  },
  sortButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderWidth: 0,
    borderRadius: 8,
    paddingVertical: 3,
  },
  menuContainer: {
    width: '100%',
    borderRadius: 3,
    elevation: 5,
    paddingVertical: 0,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomColor: '#eee',
  },
  separator: {
    height: 10,
  },
});

// Functional list component
const RepositoryList = ({ searchKeyword,order,listHeaderComponent }) => {
  const { repositories} = useRepositories({ searchKeyword:searchKeyword,orderBy: order });
  const navigate = useNavigate();

  const nodes = repositories ? repositories.edges.map(e => e.node) : [];

  return (
    <FlatList
      data={nodes}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repo/${item.id}`)}>
          <RepositoryItem {...item} />
        </Pressable>
      )}
      ListHeaderComponent={listHeaderComponent}
      stickyHeaderIndices={[0]}
    />
  );
};

export default RepositoryList;