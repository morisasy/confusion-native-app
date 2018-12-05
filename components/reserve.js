import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import { Permissions, Notifications, Calendar } from 'expo';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: ''
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    handleReservation() {

      console.log(JSON.stringify(this.state));
      if(!this.state.date)
      Alert.alert(
        'Please pick a date',
        '',
        [
          {text: 'OK', onPress: () => {
                      console.log('Date required');
                          }
                        }
        ],
        { cancelable: false }
      );
      else
      Alert.alert(
        'Please check your reservation',
        'Number of Guests:  ' + this.state.guests +'\nSmoking?  ' + this.state.smoking + '\nDate & Time: ' + this.state.date,
        [

          {text: 'Cancel', onPress: () => {
                    console.log('Reservation cancelled');
                    this.resetForm()}, style: 'cancel'},
          {text: 'OK', onPress: () => {
              this.addReservationToCalendar(this.state.date);
              this.presentLocalNotification(this.state.date);
              console.log('here');
              this.resetForm();
                          }
                        }
        ],
        { cancelable: false }
      );
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        });
    }

        async obtainNotificationPermission() {
            let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
                if (permission.status !== 'granted') {
                    Alert.alert('Permission not granted to show notifications');
                }
            }
            return permission;
        }

        async presentLocalNotification(date) {
            await this.obtainNotificationPermission();
            Notifications.presentLocalNotificationAsync({
                title: 'Your Reservation',
                body: 'Reservation for '+ date + ' requested',
                ios: {
                    sound: true
                },
                android: {
                    sound: true,
                    vibrate: true,
                    color: '#512DA8'
                }
            });
        }

        async obtainCalendarPermission() {
            let permission = await Permissions.askAsync(Permissions.CALENDAR);
            if (permission.status !== 'granted') {
                permission = await Permissions.askAsync(Permissions.CALENDAR);
                if (permission.status !== 'granted') {
                    Alert.alert('Permission not granted to update calendar');
                }
            }
            return permission;
        }

        async addReservationToCalendar(date) {
          const startdate = new Date(Date.parse(date));
          const enddate = new Date(Date.parse(date) + 7200000);
          const details = {
              title: 'Con Fusion Table Reservation',
              startDate: startdate,
              endDate: enddate,
              timeZone: 'Asia/Hong_Kong',
              endTimeZone: 'Asia/Hong_Kong',
              location:'121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'}
          await this.obtainCalendarPermission();
          await Expo.Calendar.createEventAsync(Expo.Calendar.DEFAULT, details);

  }
    render() {
        return(
              <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        onTintColor='#512DA8'
                        onValueChange={(value) => this.setState({smoking: value})}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
                <DatePicker
                    style={{flex: 2, marginRight: 20}}
                    date={this.state.date}
                    format=""
                    mode="datetime"
                    placeholder="select date and Time"
                    minDate="2017-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />
                </View>
                <View style={styles.formRow}>
                <Button
                    onPress={() => this.handleReservation()}
                    title="Reserve"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                    />
                </View>

            </Animatable.View>
        );
    }
};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
}
);

export default Reservation;
