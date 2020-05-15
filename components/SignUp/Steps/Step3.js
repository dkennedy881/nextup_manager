import React, {useState, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';

function Step3({name}) {
  return (
    <React.Fragment>
      <Text style={styles.signUpTitleText}>Account Created {name}!</Text>
      <View style={styles.signUpFieldBtnContainer}>
        <TouchableOpacity style={styles.signInBtn} onPress={forwardState}>
          <Text>Book your first appointment</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}

export default Step3;

const styles = StyleSheet.create({
  signUpContainer: {
    borderColor: '#eeee',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 30,
  },
  signUpSimpleText: {
    marginTop: 15,
  },
  skipBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
  signUpFieldTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  signUpFieldBtnContainer: {
    display: 'flex',
    marginTop: 15,
    flexDirection: 'row-reverse',
  },
  signInBtn: {
    borderColor: '#eeee',
    borderStyle: 'solid',
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 9,
  },
  forgotPasswordBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
  signUpTitleText: {
    fontSize: 25,
  },
  signUpFieldText: {
    fontSize: 15,
  },
});
