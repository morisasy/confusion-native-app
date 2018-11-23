import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button} from 'react-native';
import { Card, Icon, Rating, Input} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (comment) => dispatch(postComment(comment))
})


function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating
                    imageSize={12}
                    readonly
                    startingValue={item.rating}
                 />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date.substring(0, 10)} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>        
            <Card title='Comments' >
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Card>
        </Animatable.View>
    );
}

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card
                        featuredTitle={dish.name}
                        image={{uri: baseUrl + dish.image}}>
                                <Text style={{margin: 10}}>
                                    {dish.description}
                                </Text>
                                <View style = {styles.container}>
                                    <Icon
                                        raised
                                        reverse
                                        name={ props.favorite ? 'heart' : 'heart-o'}
                                        type='font-awesome'
                                        color='#f50'
                                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                                        />
                                    <Icon
                                        raised
                                        reverse
                                        name='pencil'
                                        type='font-awesome'
                                        color='#3b119e'
                                        onPress={props.toggleModal}                            
                                        />
                                </View>
                        
                </Card>
            </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

class DishDetail extends Component {

    constructor(props) {
        super(props);      
        this.state = {
            favorites: [],
            showModal: false,
            userRating: 3,
            author: "",
            comment: "",
        };
        
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

     
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    ratingComplete= (rating) =>{
        //console.log("Rating is: " + this.state.userRating)
        this.setState({userRating: rating}) 
    }
    handleComment(dishId, rating, author, comment) {
        console.log(JSON.stringify(this.state));
        console.log(dishId, rating, author, comment);
        this.props.postComment(dishId, rating, author, comment);
        this.toggleModal();
    }
        
    resetForm() {
        this.setState({
            showModal: false,
            userRating: 3,
            author: "",
            comment: "",
        });
    }
    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                     favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    toggleModal={ () => this.toggleModal()}
                    />
                <RenderComments 
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} 
                    />
                <Modal
                    visible = {this.state.showModal}
                    onRequestClose = {() => this.toggleModal() }>
               
                    <View style = {styles.modal}>
                       
                        <Rating
                            showRating
                            type="star"
                            fractions={1}
                            startingValue={3}
                            imageSize={40}
                            style={{ paddingVertical: 10 }}
                            onFinishRating={this.ratingComplete}
                             />
                        <Input
                        
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            onChangeText={(author) => this.setState({author})}
                            value={this.state.author}
                            />
                        <Input
            
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            onChangeText={(comment) => this.setState({comment})}
                            value={this.state.comment}
                            />

                        <Button 
                            onPress = {() =>{this.handleComment(dishId, this.state.userRating, this.state.author, this.state.comment); this.resetForm();}}
                            color="#512DA8"
                            title="Submit" 
                            buttonStyle={styles.btnSubmit}
                            accessibilityLabel="Submit"
                            />
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="#888"
                            title="Cancel"
                            buttonStyle={styles.btnCancel} 
                            accessibilityLabel="Quit Modal"
                           
                            />
                    </View>
            
                </Modal>
                
                
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
     },
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
        flex: 1,
        alignItems: 'center',
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
     },
     btnSubmit: {
        width: '100%',
        paddingTop: 10,
        backgroundColor: "#2c15a7"
    },
    btnCancel: {
        width: '100%',
        paddingTop: 10,
        backgroundColor: "#b8b9b1"
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);