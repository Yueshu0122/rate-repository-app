import React from 'react';
import { debounce } from 'lodash';
import RepositoryList from './RepositoryList';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Menu, Button, Text, DefaultTheme, Searchbar } from 'react-native-paper';
// Class container to preserve header focus
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



export class RepositoryListContainer extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        keyword: 'abc',
        menuVisible: false,
        order: 'LATEST',  // 默认排序方式
      };
  
      // 防抖
      this.debouncedSetKeyword = debounce((value) => {
        this.setState({ keyword: value });
      }, 500);

      this.renderHeader = this.renderHeader.bind(this);
    }
  
    handleSortSelect = (value) => {
      this.setState({ orderBy: value, menuVisible: false });
    };
  
    renderHeader = () => {

      console.log('Rendering Searchbar');
  
      // sortLabels 存储了排序选项标签
      const sortLabels = {
        LATEST: 'Latest',
        HIGHEST_RATED: 'Highest Rated',
        LOWEST_RATED: 'Lowest Rated',
      };
  
      return (
        <View style={styles.headerContainer}>
            <Searchbar
            placeholder="Search repositories"
            onChangeText={(text) => this.debouncedSetKeyword(text)}
            defaultValue={this.state.keyword}
            style={{ borderWidth: 1, borderColor: 'blue'   }}
          />
          {/* 排序按钮 */}
          <View style={styles.headerRow}>
            <View style={styles.sortButtonContainer}>
              <Menu
                visible={this.state.menuVisible}
                onDismiss={() => this.setState({ menuVisible: false })}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => this.setState({ menuVisible: true })}
                    style={styles.sortButton}
                    labelStyle={{
                      fontSize: 16,
                      color: DefaultTheme.colors.primary,
                    }}
                    contentStyle={{ paddingVertical: 3 }}
                  >
                    {sortLabels[this.state.orderBy]} ▼ {/* 这里动态渲染排序标签 */}
                  </Button>
                }
                contentStyle={styles.menuContainer}
              >
                <View style={{ paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                  <Text style={[styles.modalHeader, { color: DefaultTheme.colors.primary }]}>Sort By</Text>
                </View>
                {Object.entries(sortLabels).map(([key, label], idx, arr) => (
                  <Pressable
                    key={key}
                    onPress={() => this.handleSortSelect(key)}
                    style={[
                      styles.menuItem,
                      idx === arr.length - 1 && { borderBottomWidth: 0, paddingBottom: 8 },
                      idx < arr.length - 1 && { borderBottomWidth: 1 },
                    ]}
                  >
                    <Text style={{ textAlign: 'center', fontSize: 16, color: DefaultTheme.colors.primary }}>
                      {label}
                    </Text>
                  </Pressable>
                ))}
              </Menu>
            </View>
          </View>
        </View>
      );
    };
  
    render() {
      return (
        <RepositoryList
          searchKeyword={this.state.keyword}
          order={this.state.order} // 将 orderBy 传递给展示组件
          ListHeaderComponent={this.renderHeader} // 渲染头部
        />
      );
    }
  }

  export default  RepositoryListContainer;
