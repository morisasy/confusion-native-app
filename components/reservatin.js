import React, { Component } from 'react';
import { Text,
    View, 
    ScrollView, 
    StyleSheet, 
    Switch,
    Picker,
    Button,
    Modal,
    Alert,
    Platform  } from 'react-native';

import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import {
    Notifications ,
     Permissions,
      Calendar,
      Constants } from 'expo';



class Reservation extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
            
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
        
    }


    reservationInfo = () => {
        Alert.alert(
            'Your Reservation Ok?',
            'Number of guest ${this.state.guests' + ' \n' +'Smoking ?' + this.state.smoking + ' \n' + 'Date and Time ' + this.state.date,
            [
                { 
                    text: 'Cancel', 
                    onPress: this.resetForm(),
                    style: ' cancel'
                },
                {
                    text: 'OK',
                    onPress:()=> {
                        this.presentLocalNotification(this.state.date);
                        this.resetForm();
                    } 

                }
            ],
            { cancelable: false }
        );
        
    }

    
    resetForm(){
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
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
    obtainCalendarPermission = async () => {

       let  calendarPermission = await Permissions.askAsync(Permissions.CALENDAR);
        
        if (calendarPermission.status.status !== 'granted') {
            calendarPermission.status = await Permissions.askAsync(Permissions.CALENDAR);
            if (calendarPermission.status.status !== 'granted') {
                Alert.alert('Permission not granted to access calendar');
            }
        }

        return calendarPermission;

    }


  createNewCalendar = async () => {
    const calendarGranted = await this.obtainCalendarPermission();
    let calendars = []

    
    if (calendarGranted) {
      calendars = await Calendar.getCalendarsAsync()
      console.log('calendars', calendars)
    }
    const newCalendar = {
      title: 'Con Fusion Table Reservation',
      entityType: Calendar.EntityTypes.EVENT,
      color: '#2196F3',
      sourceId:
        Platform.OS === 'ios'
        ? calendars.find(cal => cal.source && cal.source.name === 'Default').source.id
        : undefined,
      source:
        Platform.OS === 'android'
        ? {
          name: calendars.find(cal => cal.accessLevel === Calendar.CalendarAccessLevel.OWNER).source.name,
          isLocalAccount: true
        }
        : undefined,
      name: 'Con Fusion Table Reservation',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
      ownerAccount:
        Platform.OS === 'android'
        ? calendars.find(cal => cal.accessLevel == Calendar.CalendarAccessLevel.OWNER).ownerAccount
        : undefined
    }

    let calendarId = null

    try {
      calendarId = await Calendar.createCalendarAsync(newCalendar)
    } catch (e) {
      Alert.alert('The Calender was not saved', e.message)
    }

    return calendarId
  }

    addReservationToCalendar= async (calendarId) => {
        
       
        let eventDetails = {
            title: "Con Fusion Table Reservation",
            startDate:new Date(this.state.date),
            endDatate: new Date(Date.parse(this.state.date)+ (2*60*60*1000)),
            location:'121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
            timeZone: 'Asia/Hong_Kong'
        }
        
        // Calendar.createEventAsync(calendarId, details)
        try {
            await Calendar.createEventAsync(calendarId, eventDetails)
            
          } catch (e) {
            Alert.alert('You can not edit the Calendar or the Event', e.message)
          }

    }

    handleReservation(){
        console.log(JSON.stringify(this.state));
        this.reservationInfo();
        const calendarId = this.createNewCalendar();
        this.addReservationToCalendar(calendarId);
      
    }


    render() {
         
   
        
        
        return(
            <ScrollView>
                <Animatable.View animation="zoomIn"
                 duration={2000} 
                 delay={1000}
                 >
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
                            format=''
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
                            // ... You can check the source to find the other keys. 
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                        />
                    </View>
                    <View style={styles.formRow}>
                    <View style={styles.formRow}>
                        <Button
                            onPress={() => this.handleReservation()}
                            title="Reserve"
                            color="#512DA8"
                            accessibilityLabel="Learn more about this purple button"
                            />
                    </View>
                    </View>  
                </Animatable.View> 
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Your Reservation</Text>
                        <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style = {styles.modalText}>Date and Time: {this.state.date.substring(0, 10)}</Text>
                        <View style={styles.formRow}>
                            <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                                color = "#512DA8"
                                title="Close" 
                                
                                />
                        </View>
                    </View>
                </Modal>       
            </ScrollView>
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

    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default Reservation;


===============

import React, { Component } from 'react';
import { Text,
    View, 
    ScrollView, 
    StyleSheet, 
    Switch,
    Picker,
    Button,
    Modal,
    Alert,
    Platform  } from 'react-native';

import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import {
    Notifications ,
     Permissions,
      Calendar,
      Constants } from 'expo';



class Reservation extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
            
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
        
    }

    handleReservation(){
        console.log(JSON.stringify(this.state));
        Alert.alert(
            'Your Reservation Ok?',
            'Number of guest ${this.state.guests' + ' \n' +'Smoking ?' + this.state.smoking + ' \n' + 'Date and Time ' + this.state.date,
            [
                { 
                    text: 'Cancel', 
                    onPress: this.resetForm(),
                    style: ' cancel'
                },
                {
                    text: 'OK',
                    onPress:()=> {
                        this.addReservationToCalendar(this.state.date);
                        this.presentLocalNotification(this.state.date);
                        console.log('here date',this.state.date);
                        this.resetForm();
                    } 

                }
            ],
            { cancelable: false }
        );
        
      
    }

    resetForm(){
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
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
    async obtainCalendarPermission (){

       let  calendarPermission = await Permissions.askAsync(Permissions.CALENDAR);
        
        if (calendarPermission.status.status !== 'granted') {
            calendarPermission.status = await Permissions.askAsync(Permissions.CALENDAR);
            if (calendarPermission.status.status !== 'granted') {
                Alert.alert('Permission not granted to access calendar');
            }
        }

        return calendarPermission;

    }


    async addReservationToCalendar(date) {
        const startdate = new Date(Date.parse(date));
        const enddate = new Date(Date.parse(date) + 7200000);
        console.log('date', date);
        console.log('startdate', startdate);
        console.log('enddate', enddate);
        let eventDetails = {
            title: "Con Fusion Table Reservation",
            startDate: startdate,
            endDate: enddate,
            location:'121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
            timeZone: 'Asia/Hong_Kong',
            endTimeZone: 'Asia/Hong_Kong'
        }
        console.log('date', eventDetails);
        
        await this.obtainCalendarPermission();
        await Expo.Calendar.createEventAsync(Expo.Calendar.DEFAULT, eventDetails);        

    }

   


    render() {
             
        return(
            <ScrollView>
                <Animatable.View animation="zoomIn"
                 duration={2000} 
                 delay={1000}
                 >
                 <View style={styles.formRow}>
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
                            format=''
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
                                marginLeft: 0,
                                marginBottom: 10
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
                    </View>  
                </Animatable.View> 
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Your Reservation</Text>
                        <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style = {styles.modalText}>Date and Time: {this.state.date.substring(0, 10)}</Text>
                        <View style={styles.formRow}>
                            <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                                color = "#512DA8"
                                title="Close" 
                                
                                />
                        </View>
                    </View>
                </Modal>       
            </ScrollView>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20,
      marginBottom: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
        color: "black"
    },
    formItem: {
        flex: 1
    },

    modal: {
        justifyContent: 'center',
        marginTop: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default Reservation;