import React, {useState, Component} from 'react';

//comps
import Queue from './Queue';

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
} from 'react-native';

class QueuesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queues: [],
      isSet: false,
    };
  }

  getQueues = () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res([
          {
            id: 1,
            title: 'Turkey Leg Hut',
            message: 'Yo wait time for every person in the line is 30 min.',
            hours:{
              open:"9:00 AM",
              close:"5:00 PM"
            }
          },
          {
            id: 2,
            title: 'Some Fish Place',
            message: 'I dont really know what to put here',
            hours:{
              open:"9:00 AM",
              close:"5:00 PM"
            }
          },
          {id: 3, title: 'Brothers Barbee-Q',message:"",hours:{
            open:"9:00 AM",
            close:"5:00 PM"
          }},
          {
            id: 4,
            title: 'Turkey Leg Hut',
            message: 'Yo wait time for every person in the line is 30 min.',
            hours:{
              open:"9:00 AM",
              close:"5:00 PM"
            }
          },
          {
            id: 5,
            title: 'Some Fish Place',
            message: 'I dont really know what to put here',
            hours:{
              open:"9:00 AM",
              close:"5:00 PM"
            }
          },
          {id: 6, title: 'Brothers Barbee-Q',message:"",hours:{
            open:"9:00 AM",
            close:"5:00 PM"
          }},
          {
            id: 7,
            title: 'Turkey Leg Hut',
            message: 'Yo wait time for every person in the line is 30 min.',
            hours:{
              open:"9:00 AM",
              close:"5:00 PM"
            }
          },
          {
            id: 8,
            title: 'Some Fish Place',
            message: 'I dont really know what to put here',
            hours:{
              open:"9:00 AM",
              close:"5:00 PM"
            }
          },
          {id: 9, title: 'Brothers Barbee-Q',message:"",hours:{
            open:"9:00 AM",
            close:"5:00 PM"
          }}
        ]);
      }, 1000);
    });
  };

  async componentDidMount() {
    if (!this.state.isSet) {
      let queues = await this.getQueues();
      this.setState(state => ({
        ...state,
        queues,
        isSet: !state.isSet,
      }));
    }
  }

  render() {
    let {queues} = this.state;
    return (
      <ScrollView style={styles.QueuesListContainer}>
        <FlatList
          data={queues}
          renderItem={({item}) => <Queue key={item.id} queue={item} />}
          keyExtractor={item => String(item.id)}
        />
      </ScrollView>
    );
  }
}

export default QueuesList;

const styles = StyleSheet.create({
  QueuesListContainer: {
    borderColor: '#eeee',
    borderStyle: 'solid',
    // overflow: 'scroll',
    position:"relative",
    top:1
  },
});
