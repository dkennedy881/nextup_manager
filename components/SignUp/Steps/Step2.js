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

function Step2({forwardState,callSignIn,updateZip,zipCode}) {
  return (
    <React.Fragment>
      <Text style={styles.signUpTitleText}>Verified!</Text>
      <Text style={styles.signUpSimpleText}>
        Please Enter your ZIP Code so that we can recoment places or whatever.
      </Text>
      <View style={styles.signUpFieldTextContainer}>
        <Text style={styles.signUpFieldText}>ZIP/Postal Code: </Text>
        <TextInput onChangeText={(text)=>updateZip(text)} value={zipCode} placeholder="78748" />
      </View>
      <View style={styles.signUpFieldBtnContainer}>
        <TouchableOpacity onPress={callSignIn} style={styles.signInBtn}>
          <Text>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={forwardState} onPress={callSignIn} style={styles.skipBtn}>
          <Text>Skip this step</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}

export default Step2;

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
