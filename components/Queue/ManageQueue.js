import React, { useState, Component } from "react";

//comps
import QueueMeta from "./QueueMeta";

import {
  StyleSheet,
  View,
  Text,
  Keyboard,
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

    await updateUserQueue(queueData);
    // this.setState({ queueData });
  };

  updateQueueMeta = async (queueData) => {
    let { updateUserQueue } = this.props;
    let { queueData: withCount } = this.state;
    queueData.count = withCount.count;

    //update the app.js state
    await updateUserQueue(queueData);
    return;
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
          <QueueMeta
            editing={false}
            queueData={queueData}
            userObj={userObj}
            updateQueueMeta={updateQueueMeta}
            count={queueData.count}
            updateQueueCount={updateQueueCount}
          />
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
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#f5f5f5",
  },
  titleText: {
    fontWeight: "200",
    marginBottom: 10,
    fontSize: 35,
    color: "#121212",
    textAlign: "center",
  },
});

/*

  Todo need to include an 'updating state'


*/
