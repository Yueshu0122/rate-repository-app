// AppBarTab.jsx
import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { Link } from "react-router-native";

const AppBarTab = ({ label,to }) => {
  return (
    <Link style={styles.tab} to={to}>
        <Text style={styles.tabText}>{label}</Text>
    </Link>
  );
};

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  tabText: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6
  },
});

export default AppBarTab;