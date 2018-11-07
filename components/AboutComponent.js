import React, { Component } from 'react';
import { FlatList, Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
  }


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

class About extends Component {

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
                            leftAvatar={{source: {uri: baseUrl + item.image}}}
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
                                data={this.props.leaders.leaders}
                                renderItem={renderLeaderItem}
                                keyExtractor={item => item.id.toString()}
                                />
                    </Card>
                </View>
            </ScrollView>
                
        );
    }
}


export default connect(mapStateToProps)(About);