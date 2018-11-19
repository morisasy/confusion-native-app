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



<Input
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            onChangeText={(author) => this.setState({author})}
                            value={this.state.author}
                            />
                        <Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            onChangeText={(comment) => this.setState({comment})}
                            value={this.state.comment}
                            />







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
                    onDismiss = {() => this.toggleModal()} 
                    onRequestClose = {() => this.toggleModal() }>
               
                    <View style = {styles.modal}>
                       
                        <Text style = {styles.modalTitle}>Your Comment</Text>
                        <Rating
                            showRating
                            type="star"
                            fractions={1}
                            startingValue={3}
                            imageSize={40}
                            style={{ paddingVertical: 10 }}
                            onFinishRating={(rating)=> this.ratingComplete({rating}) }
                             />
                        <Input
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            onChangeText={(author) => this.setState({author})}
                            value={this.state.author}
                            />
                        <Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            onChangeText={(comment) => this.setState({comment})}
                            value={this.state.comment}
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
                
                
            </ScrollView>