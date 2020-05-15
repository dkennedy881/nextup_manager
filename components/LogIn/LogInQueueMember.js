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

function LogInQueueMember({logIn,toggleLogInSignUp}) {

  [phoneNumber,setPhoneNumber] = useState();

  const updatePhoneNumber = phoneNumber => setPhoneNumber(phoneNumber);

  return (
    <React.Fragment>
      <Text style={styles.logInTitleText}>Log In Queue Member</Text>
      <View style={styles.logInFieldTextContainer}>
        <Text style={styles.logInFieldText}>Phone Number: </Text>
        <TextInput placeholder="Phone Number" onChangeText={updatePhoneNumber} />
      </View>
      <View style={styles.logInFieldBtnContainer}>
        <TouchableOpacity style={styles.signInBtn} onPress={()=>logIn(phoneNumber)}>
          <Text>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPasswordBtn} onPress={toggleLogInSignUp}>
          <Text>Dont have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}

export default LogInQueueMember;

const styles = StyleSheet.create({
  logInContainer: {
    borderColor: '#eeee',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 30,
  },
  logInFieldTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  logInFieldBtnContainer: {
    display: 'flex',
    marginTop: 15,
    flexDirection: 'row-reverse',
  },
  signInBtn:{
    borderColor: '#eeee',
    borderStyle: 'solid',
    borderWidth: 1,
    paddingTop:10,
    paddingBottom:10,
    paddingRight:15,
    paddingLeft:15,
    borderRadius:9
  },
  forgotPasswordBtn:{
    paddingTop:10,
    paddingBottom:10,
    paddingRight:15,
    paddingLeft:15
  },
  logInTitleText: {
    fontSize: 25,
  },
  logInFieldText: {
    fontSize: 15,
  },
});
