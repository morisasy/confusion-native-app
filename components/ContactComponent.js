import React, { Component } from 'react';
import { Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Card, Button, Icon } from 'react-native-elements';
import { MailComposer } from 'expo';

class ContactUs extends Component {


    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }

   
    render() {
        
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>                
             <Card  title='Contact Information'>
                <View>
                        <Text style={{ margin: 6 }}>
                            121, Clear Water Bay Road
                        </Text>
                        <Text style={{ margin: 6 }}>
                            Clear Water Bay, Kowloon
                        </Text>
                        <Text style={{ margin: 6 }}>
                            HONG KONG
                        </Text>
                        <Text style={{ margin: 6 }}>
                            Tel: +852 1234 5678
                        </Text>
                        <Text style={{ margin: 6 }}>
                            Fax: +852 8765 4321
                        </Text>
                        <Text style={{ margin: 6 }}>
                            Email:confusion@food.net
                        </Text>

                    <Button
                        title="Send Email"
                        buttonStyle={{backgroundColor: "#512DA8"}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.sendMail}
                        />
                </View>
            </Card>
        </Animatable.View>
          
        );
    }
}


export default ContactUs;