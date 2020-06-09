import React, { useState, Component } from "react";
import LinearGradient from "react-native-linear-gradient";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  ListItem,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      setCounter: 0,
      isSet: false,
    };
  }

  increment = () => {
    let { count, setCounter } = this.state;
    count = parseInt(count) + 1;
    this.setState({ count: parseInt(count) });
    Keyboard.dismiss();
  };

  decrement = () => {
    let { count } = this.state;
    count = parseInt(count) - 1;
    if (count >= 0) this.setState({ count: parseInt(count) });
    Keyboard.dismiss();
  };

  updateTextInput = (count) => {
    if (count !== "") {
      if (count >= 0) this.setState({ count: parseInt(count) });
    } else {
      this.setState({ count: parseInt(0) });
    }
  };

  componentDidMount() {
    if (!this.state.isSet) {
      let { count } = this.props;
      this.setState((state) => ({
        ...state,
        count,
        setCounter: count,
        isSet: !state.isSet,
      }));
    }
  }

  updateSetCount = () => {
    let { count } = this.state;

    let { updateQueueCount } = this.props;
    this.setState((state) => ({
      ...state,
      setCounter: count,
    }));

    updateQueueCount(count);
  };

  render() {
    let { count, setCounter } = this.state;
    let { updateTextInput, updateSetCount } = this;
    return (
      <View
        colors={["#317791", "#317791", "#FFFFFF"]}
        style={styles.CountContainer}
      >
        {parseInt(count) === parseInt(setCounter) ? (
          <View style={styles.countTextContainer}>
            <TextInput
              keyboardType={"numeric"}
              style={styles.countText}
              onChangeText={(count) => {
                updateTextInput(count);
              }}
            >
              {count}
            </TextInput>
          </View>
        ) : (
          <View style={styles.countTextContainer2}>
            <TextInput
              keyboardType={"numeric"}
              style={styles.countText}
              onChangeText={(count) => {
                updateTextInput(count);
              }}
            >
              {count}
            </TextInput>
          </View>
        )}
        <View style={styles.CounterBtnContainer}>
          <TouchableOpacity style={styles.countBtnL} onPress={this.decrement}>
            <Text style={styles.countBtnText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.countBtnCenter}
            onPress={() => {
              updateSetCount();
            }}
          >
            <Text style={styles.countBtnCenterText}>update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.countBtnR} onPress={this.increment}>
            <Text style={styles.countBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Counter;

const styles = StyleSheet.create({
  CountContainer: {
    backgroundColor: "white",
    borderRadius: 9,
    width: "65%",
    borderWidth: 1,
    borderColor: "#eee",
    alignContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },
  countTextContainer: {
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: "#6da8bd",
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
  },
  countTextContainer2: {
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: "red",
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
  },
  countText: {
    fontSize: 60,
    textAlign: "center",
    color: "white",
  },
  CounterBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomRightRadius: 9,
    borderBottomLeftRadius: 9,
  },
  countBtnR: {
    flex: 1,
    padding: 10,
    textAlign: "center",
    backgroundColor: "#eeeeee",
    borderBottomRightRadius: 9,
  },
  countBtnL: {
    flex: 1,
    padding: 10,
    textAlign: "center",
    backgroundColor: "#eeeeee",
    borderBottomLeftRadius: 9,
  },
  countBtnText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
  },
  countBtnCenter: {
    flex: 1,
    padding: 10,
    textAlign: "center",
    backgroundColor: "#eeeeee",
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "#aaaaaa",
  },
  countBtnCenterText: {
    textAlign: "center",
    fontWeight: "800",
  },
});
