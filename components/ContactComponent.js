import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

function ContactCard() {
    
    return(
        <Card  title="Contact Information">
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