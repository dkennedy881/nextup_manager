import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';

const Header = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

Header.defaultProps = {
    title:"NextUp"
}

const styles = StyleSheet.create({
  header: {
    height:60,
    padding:15,
    backgroundColor:"red"
  },
  headerText: {
    color:"white",
    fontSize:23,
    textAlign:"center"
  }
});

export default Header;