import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Pressable  } from 'react-native';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Menu, Button, Text,useTheme ,Searchbar} from 'react-native-paper';



const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButtonContainer: {
    flex: 1,                     // 占据剩余空间
  },
  sortButton: {
    alignSelf: 'stretch',        // 拉伸到父容器宽度
    justifyContent: 'center',    // 文字垂直居中
    borderWidth: 0,              // 去掉边框
    borderRadius: 8,
    paddingVertical: 3,
  
  },
  menuContainer: {
    width: '100%',               // 跟按钮同宽
    borderRadius: 3,
    elevation: 5,
    paddingVertical: 0,
    paddingHorizontal: 122,
    // 设置背景色和透明度，这里白色 90% 不透明度
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#6200ee',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomColor: '#eee',
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {

  const theme = useTheme(); 

  const { repositories , setOrderBy, orderBy} = useRepositories();
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const handleSortSelect = (value) => {
    setOrderBy(value);
    setMenuVisible(false); // Close the menu after selection
  };

  const sortLabels = {
    LATEST: 'Latest',
    HIGHEST_RATED: 'Highest Rated',
    LOWEST_RATED: 'Lowest Rated',
  };

    
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories?.edges?.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repo/${item.id}`)}>
          <RepositoryItem {...item} />
        </Pressable>
    )}
      keyExtractor={item => item.id}
      // ListHeaderComponent={
      //   <View style={styles.header}>
      //     <Text style={styles.title}>Reviewed Repositories</Text>
      //     <Picker
      //       selectedValue={orderBy}
      //       onValueChange={(itemValue) => setOrderBy(itemValue)}
      //     >
      //       <Picker.Item label="Latest" value="LATEST" />
      //       <Picker.Item label="Highest Rated" value="HIGHEST_RATED" />
      //       <Picker.Item label="Lowest Rated" value="LOWEST_RATED" />
      //     </Picker>
      //   </View>
      // }
      ListHeaderComponent={
        <View style={styles.header}>
          <View style={styles.sortButtonContainer}>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setMenuVisible(true)}
                  style={styles.sortButton}
                  labelStyle={{ fontSize: 16 }} 
                >
                  {sortLabels[orderBy]} ▼
                </Button>
              }
              contentStyle={styles.menuContainer}
            >
              <View style={{ paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                <Text style={[styles.modalHeader,{color: theme.colors.primary}]}>Sort By</Text>
              </View>
              {Object.entries(sortLabels).map(([key, label], idx, arr) => (
                <Pressable
                  key={key}
                  onPress={() => handleSortSelect(key)}
                  style={[
                    styles.menuItem,
                    // 如果是最后一项，则去掉边框
                    idx === arr.length - 1 && { borderBottomWidth: 0, paddingBottom: 8 },
                    idx < arr.length - 1 && { borderBottomWidth: 1 },
                  ]}
                >
                  <Text style={{ textAlign: 'center', fontSize: 16 ,color: theme.colors.primary}}>{label}</Text>
                </Pressable>
              ))}
            </Menu>
          </View>
        </View>
      }
    />
  );
};

export default RepositoryList;