import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import firebase from 'react-native-firebase';

class App extends React.Component {
  async componentDidMount() {
    const enabled = await firebase.messaging().hasPermission();

    if (enabled) {
      const fcmToken = await firebase.messaging().getToken();
      console.log('fcmToken', fcmToken);

      firebase.notifications().onNotification(notification => {
        alert('got a notification');
      });
    } else {
      try {
        firebase.messaging().requestPermission();
      } catch (e) {
        alert('user rejected the permissions');
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Test Push Notifications</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
