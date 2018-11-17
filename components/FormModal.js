<Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>

                        <Rating
                                showRating
                                type="star"
                                fractions={1}
                                ratingCount= {5}
                                startingValue={3.6}
                                readonly
                                imageSize={40}
                                onFinishRating={this.ratingCompleted}
                                onStartRating={this.ratingStarted}
                                style={{ paddingVertical: 10 }}
                        />
                        <Text style = {styles.modalTitle}>author</Text>
                        <Input
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'author' }}
                            onChangeText={(author) => this.setState({author})}
                            value={this.state.author}
                            />
                        <Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment' }}
                            onChangeText={(comment) => this.setState({comment})}
                            value={this.state.author}
                            />
                    
                        <Button 
                            onPress = {() =>{() => this.handleReservation(); this.resetForm();}}
                            color="#512DA8"
                            title="Submit" 
                            />
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="#512DA8"
                            title="Cancel" 
                            />
                    </View>
                </Modal>