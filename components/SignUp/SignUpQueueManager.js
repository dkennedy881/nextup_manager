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
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Axios from "axios";

import States from "./Steps/Utils";

//comps
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";

class SignUpQueueManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      username: "",
      phoneNumber: "",
      name: "",
      address: "",
      zipCode: "",
      password: "",
      passwordValidate: "",
      state: "",
      city: "",
    };
  }

  updateUsername = (username) => {
    this.setState({ username });
  };

  updatePhoneNumber = (phoneNumber) => {
    this.setState({ phoneNumber });
  };

  updateName = (name) => {
    this.setState({ name });
  };

  updateAddress = (address) => {
    this.setState({ address });
  };

  updatePassword = (password) => {
    this.setState({ password });
  };

  updatePasswordValidate = (passwordValidate) => {
    this.setState({ passwordValidate });
  };

  updateZip = (zipCode) => {
    this.setState({ zipCode });
  };

  updateState = (state) => {
    this.setState({ state });
  };

  updateCity = (city) => {
    this.setState({ city });
  };

  callSignIn = () => {
    let { phoneNumber, name, password } = this.state;
    this.props.signUp(this.props.queueMember, phoneNumber, name, password);
  };

  forwardState = async () => {
    const {
      step,
      phoneNumber,
      name,
      address,
      zipCode,
      password,
      username,
      city,
      state,
    } = this.state;
    if (step === 1) {
      if (!this.allFilled1()) {
        alert("All fields must be filled out");
        return;
      }

      if (!this.matchingPasswords()) {
        alert("Passwords must match");
        return;
      }
      if (!this.validUsername()) {
        alert("Please enter a valid email address");
        return;
      }
    }
    // TODO changed phoneNumber to username
    // TODO change api
    // check if use already exists
    let { data } = await Axios.post(
      "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/nextup-ssnrm/service/checkNewQueueManager/incoming_webhook/webhook0",
      {
        username: String(username).toLocaleLowerCase().trim(),
        password: String(password),
      }
    );
    if (data) {
      alert(
        `An account with the provided email address already exists = ${username}`
      );
      return;
    }

    if (step === 2) {
      if (!this.allFilled2()) {
        alert("All fields must be filled out");
        return;
      } else {
        this.props.signUp(
          this.props.queueMember,
          phoneNumber,
          name,
          password,
          address,
          zipCode,
          username,
          city,
          state
        );
      }
      return;
    }
    this.setState({ step: step + 1 });
  };

  backState = () => {
    let { step } = this.state;
    step > 1 ? this.setState({ step: step - 1 }) : null;
  };

  allFilled2 = () => {
    const {
      phoneNumber,
      name,
      username,
      passwordValidate,
      step,
      ...rest
    } = this.state;
    for (let key in rest) {
      if (!rest[key]) {
        return false;
      }
    }
    return true;
  };

  validUsername = () => {
    const { username } = this.state;
    if (
      !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        username
      )
    )
      return false;

    return true;
  };

  allFilled1 = () => {
    const {
      zipCode,
      step,
      address,
      phoneNumber,
      state,
      city,
      ...rest
    } = this.state;
    // console.log(rest);
    for (let key in rest) {
      if (!rest[key]) return false;
    }
    return true;
  };

  matchingPasswords() {
    const { password, passwordValidate } = this.state;

    //any spaces
    if (/.*\s{1,}/.test(password) || /.*\s{1,}/.test(passwordValidate))
      return false;

    if (!password.length || !passwordValidate.length) return false;

    return password === passwordValidate;
  }

  render() {
    let {
      step,
      name,
      phoneNumber,
      address,
      zipCode,
      password,
      passwordValidate,
      username,
      city,
      state,
    } = this.state;
    let {
      forwardState,
      backState,
      callSignIn,
      updateName,
      updatePhoneNumber,
      updateAddress,
      updateZip,
      updatePassword,
      updatePasswordValidate,
      updateUsername,
      updateCity,
      updateState,
    } = this;
    let { toggleLogInSignUp, queueMember } = this.props;

    switch (step) {
      case 1:
        return (
          <Step1
            queueMember={queueMember}
            forwardState={forwardState}
            toggleLogInSignUp={toggleLogInSignUp}
            updateName={updateName}
            name={name}
            password={password}
            passwordValidate={passwordValidate}
            updatePassword={updatePassword}
            updatePasswordValidate={updatePasswordValidate}
            username={username}
            updateUsername={updateUsername}
          />
        );
      case 2:
        return (
          <Step2
            backState={backState}
            queueMember={queueMember}
            forwardState={forwardState}
            callSignIn={callSignIn}
            zipCode={zipCode}
            updateZip={updateZip}
            address={address}
            username={username}
            updatePhoneNumber={updatePhoneNumber}
            phoneNumber={phoneNumber}
            updateUsername={updateUsername}
            updateAddress={updateAddress}
            updateCity={updateCity}
            updateState={updateState}
            city={city}
            state={state}
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
    borderColor: "#eeee",
    borderStyle: "solid",
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
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
  },
  signUpFieldBtnContainer: {
    display: "flex",
    marginTop: 15,
    flexDirection: "row-reverse",
  },
  signInBtn: {
    borderColor: "#eeee",
    borderStyle: "solid",
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
