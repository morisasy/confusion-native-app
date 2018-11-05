import React, { Component } from 'react';
import { FlatList, Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { ListItem } from 'react-native-elements';

import { LEADERS } from '../shared/leaders';

const descriptions = `Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong. Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.`;

const descriptions2 = `The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan,that featured for the first time the world's best cuisines in a pan.`;

function History() {
    
    return(
        <Card title="Our Histroy">
            <Text style={{paddingBottom:10}}>{descriptions}</Text>
            <Text>{descriptions2}</Text>
        </Card>
    );
}

class AboutUS extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leaders: LEADERS
        };
    }

    static navigationOptions = {
        title: 'About Us'
    };

    render() {
       

        const renderLeaderItem = ({item, index}) => {

            return (
                <ListItem
                                key={index}
                                title={item.name}
                                subtitle={item.description}
                                hideChevron={true}
                                leftAvatar={{ source: require('./images/vadonut.png')}}
                                containerStyle={{ borderBottomWidth: 0 }}
                            />

               
            );
        };

       

        return (
            <ScrollView>
                <View>
                    <History />
                </View>
                <View>
                    <Card title="Cooperate Leadership">
                            <FlatList 
                                    data={this.state.leaders}
                                    renderItem={renderLeaderItem}
                                    
                                    keyExtractor={item => item.id.toString()}
                                    />
                    </Card>
                </View>
            </ScrollView>
                
        );
    }
}


export default AboutUS;