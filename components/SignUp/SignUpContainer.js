import React, { useState, Component } from "react";
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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

//comps
import SignUpQueueMember from "./SignUpQueueMember";
import SignUpQueueManager from "./SignUpQueueManager";

class SignUpContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  signUp = (type, phoneNumber, name, zipCode) => {
    if (type) {
      alert(`Phone Number - ${phoneNumber} Name - ${name} Zip - ${zipCode}`);
    } else {
      alert(
        `Business Phone Number - ${phoneNumber} Business Name - ${name} Business Zip - ${zipCode}`
      );
    }
    this.props.toggleLogIn();
  };

  render() {
    let { queueMember, toggleLogInSignUp, toggleLogIn } = this.props;
    if (queueMember) {
      return (
        <View style={styles.signUpContainer}>
          <SignUpQueueMember
            signUp={this.signUp}
            toggleLogInSignUp={toggleLogInSignUp}
            queueMember={true}
          />
        </View>
      );
    } else {
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.signUpContainer}>
            <SignUpQueueManager
              signUp={this.signUp}
              toggleLogInSignUp={toggleLogInSignUp}
              queueMember={false}
              toggleLogIn={toggleLogIn}
            />
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }
}

export default SignUpContainer;

const styles = StyleSheet.create({
  signUpContainer: {
    borderColor: "#eeee",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 30,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  signUpFieldTextContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  signUpTitleText: {
    fontSize: 25,
  },
  signUpFieldText: {
    fontSize: 15,
  },
});
