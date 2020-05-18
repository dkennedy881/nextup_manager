import React, { useState, Component } from "react";

//comps
import Counter from "./Counter";
import QueueMeta from "./QueueMeta";

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
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

class ManageQueue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSet: false,
      queueData: false,
      showSettings: false,
    };
  }

  updateQueueCount = async (count) => {
    Keyboard.dismiss();

    let { updateUserQueue } = this.props;
    let { queueData } = this.state;

    queueData.count = count;
    alert(JSON.stringify(queueData));
    // return;
    //update the app.js state
    updateUserQueue(queueData);
  };

  updateQueueMeta = async (queueData) => {
    let { updateUserQueue } = this.props;

    //update the app.js state
    updateUserQueue(queueData);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let { queueData, showSettings } = nextProps;

    if (queueData) {
      return {
        queueData,
        showSettings,
        isSet: true,
      };
    } else {
      return null;
    }
  }

  render() {
    let { isSet, queueData, showSettings } = this.state;
    let { updateQueueCount, updateQueueMeta } = this;
    let { userObj } = this.props;
    if (isSet) {
      if (showSettings) {
        return (
          <QueueMeta
            updateQueueMeta={updateQueueMeta}
            editing={true}
            queueData={queueData}
            userObj={userObj}
          />
        );
      } else {
        return (
          <ScrollView>
            <View style={styles.ManageQueueContainer}>
              <Counter
                count={queueData.count}
                updateQueueCount={updateQueueCount}
              />
              <QueueMeta
                editing={false}
                queueData={queueData}
                userObj={userObj}
              />
            </View>
          </ScrollView>
        );
      }
    } else {
      return (
        <View style={styles.ManageQueueContainer}>
          <Text>Loading...</Text>
        </View>
      );
    }
  }
}

export default ManageQueue;

const styles = StyleSheet.create({
  ManageQueueContainer: {
    height: "100%",
    marginTop: 80,
    alignItems: "center",
  },
});

/*

  Todo need to include an 'updating state'


*/
