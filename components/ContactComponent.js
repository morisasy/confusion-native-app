import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

function ContactCard() {
    
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
                </View>
            </Card>
        </Animatable.View>
    );
}

class ContactUs extends Component {

   
    render() {
        
        return(
            <ContactCard />
          
        );
    }
}


export default ContactUs;