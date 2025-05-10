import React from 'react';
import RepositoryList from './RepositoryList';  // Import your custom RepositoryList
import { View, Text, StyleSheet ,Pressable } from 'react-native';
import { Menu, Button, DefaultTheme, Searchbar } from 'react-native-paper';
import { debounce } from 'lodash';

const styles = StyleSheet.create({
    headerContainer: {
      padding: 10,
      backgroundColor: '#f9f9f9',
      height: 120, 
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
        alignSelf: 'stretch', // Ensure button takes up available width
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 0,              // 去掉边框
        paddingVertical: 0,
    },
    menuContainer: {
      width: '100%',
      borderRadius: 3,
      elevation: 5,
      paddingVertical: 0,
      backgroundColor: 'rgba(255,255,255,0.9)',
      paddingHorizontal: 122,

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

// Simplified header for testing
export class RepositoryListContainer extends React.Component {

    constructor(props) {
          super(props);
          this.state = {
            keyword: '',
            menuVisible: false,
            order: 'LATEST',  // 默认排序方式
          };
      
          // 防抖
          this.debouncedSetKeyword = debounce((value) => {
            this.setState({ keyword: value });
          }, 1000);
    
          this.renderHeader = this.renderHeader.bind(this);
        }
      
        handleSortSelect = (value) => {
          this.setState({ order: value, menuVisible: false });
        };
  renderHeader = () => {
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
      autoCapitalize='none'
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
              contentStyle={{ 
                paddingVertical: 0, // Adjust this value to control the vertical padding
                paddingHorizontal: 10, // Adjust horizontal padding if necessary
              }}
            >
              {sortLabels[this.state.order]} ▼ {/* 这里动态渲染排序标签 */}
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
        order={this.state.order}  
        listHeaderComponent={this.renderHeader}  // Pass the header component to RepositoryList
      />
    );
  }
}

export default RepositoryListContainer;
