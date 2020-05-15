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
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

//comps
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';

class SignUpQueueManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      phoneNumber: '',
      name: '',
      zipCode: '',
    };
  }

  updatePhoneNumber = phoneNumber => {
    this.setState({phoneNumber});
  };

  updateName = name => {
    this.setState({name});
  };

  updateZip = zipCode => {
    this.setState({zipCode});
  };

  validatePhoneNumber = () => {};

  callSignIn = () => {
    let {phoneNumber, name, zipCode} = this.state;
    this.props.signUp(this.props.queueMember, phoneNumber, name, zipCode);
  };

  forwardState = () => {
    this.setState({step: this.state.step + 1});
  };

  backState = () => {
    this.setState({step: this.state - 1});
  };

  render() {
    let {step, name, phoneNumber, zipCode} = this.state;
    let {
      forwardState,
      callSignIn,
      updateName,
      updatePhoneNumber,
      updateZip,
    } = this;
    let {toggleLogInSignUp, queueMember} = this.props;

    switch (step) {
      case 1:
        return (
          <Step1
            queueMember={queueMember}
            forwardState={forwardState}
            toggleLogInSignUp={toggleLogInSignUp}
            updateName={updateName}
            name={name}
            updatePhoneNumber={updatePhoneNumber}
            phoneNumber={phoneNumber}
          />
        );
      case 2:
        return (
          <Step2
            queueMember={queueMember}
            forwardState={forwardState}
            callSignIn={callSignIn}
            zipCode={zipCode}
            updateZip={updateZip}
          />
        );
      default:
        return <Step3 name={name} />;
    }
  }
}
export default SignUpQueueManager;

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
