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
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";

//comps
import LogInQueueMember from "./LogInQueueMember";
import LogInQueueManager from "./LogInQueueManager";

class LogInContainer extends Component {
  logIn = (username, password) => {
    const { toggleLogIn } = this.props;
    toggleLogIn(username, password);
  };

  callResetPassword = async (username) => {
    const { resetPassword } = this.props;
    return await resetPassword(username);
  };

  render() {
    let { queueMember, toggleLogInSignUp } = this.props;
    if (queueMember) {
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.logInContainer}>
            <Image
              style={{ width: 150, height: 40 }}
              source={require("../../images/next-up_text-color.jpeg")}
            />
            <LogInQueueMember
              logIn={this.logIn}
              toggleLogInSignUp={toggleLogInSignUp}
            />
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            enabled
            style={{}}
            keyboardVerticalOffset={0}
            behavior="padding"
          >
            <View style={styles.logInContainer}>
              <LogInQueueManager
                logIn={this.logIn}
                toggleLogInSignUp={toggleLogInSignUp}
                callResetPassword={this.callResetPassword}
              />
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      );
    }
  }
}

const styles = StyleSheet.create({
  logInContainer: {
    padding: 30,
    alignSelf: "stretch",
    overflow: "hidden",
  },
});

export default LogInContainer;
