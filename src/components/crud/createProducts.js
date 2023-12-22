import React, { Component } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Grid } from '@material-ui/core'; // Import Material-UI components


class CreateProduct extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductQty = this.onChangeProductQty.bind(this);
        this.onChangeProductImage = this.onChangeProductImage.bind(this);
        this.onChangeProductComment = this.onChangeProductComment.bind(this); // Correct method name
        this.state = {
            Name: '',
            Qty: '',
            Image: '',
            Comment: '' // New property for comment
        };
    }


    handleSubmit(event) {
        event.preventDefault();
    
        const newProduct = {
            name: this.state.Name,
            qty: this.state.Qty,
            image: this.state.Image,
            comment: this.state.Comment // Include the comment in the newProduct object
        };
    
        axios.post('http://localhost:4000/api/products', newProduct)
            .then((res) => {
                console.log(res);
                // Further actions upon successful API call
            })
            .catch((err) => {
                console.log(err);
                // Handle errors gracefully or display them to the user
            });
    
        this.setState({
            Name: '',
            Qty: '',
            Image: '',
            Comment: '' // Reset comment after submission
        });
    }
    

    onChangeProductName(event) {
        this.setState({
            Name: event.target.value // Updates the 'Name' value in the state.
        });
    }

    onChangeProductQty(event) {
        this.setState({
            Qty: event.target.value // Updates the 'Qty' value in the state.
        });
    }

    onChangeProductImage(event) {
        this.setState({
            Image: event.target.value // Updates the 'Image' value in the state.
        });
    }

    onChangeProductComment(event) {
        this.setState({ Comment: event.target.value }); // Update the Comment state
    }

    render() {
        return (
            <Container maxWidth="sm"> {/* Wrap your form in a Material-UI Container */}
                <h2>Fill in product details to add into database</h2>
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Add Product Name"
                                variant="outlined"
                                fullWidth
                                value={this.state.Name}
                                onChange={this.onChangeProductName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Add Quantity"
                                variant="outlined"
                                fullWidth
                                value={this.state.Qty}
                                onChange={this.onChangeProductQty}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Add Image Url"
                                variant="outlined"
                                fullWidth
                                multiline
                                value={this.state.Image}
                                onChange={this.onChangeProductImage}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Add Comment"
                                variant="outlined"
                                fullWidth
                                multiline
                                value={this.state.Comment}
                                onChange={this.onChangeProductComment}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit">
                                Add Product
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <footer>
                    <p>&copy; {new Date().getFullYear()} Al Jabarah. All Rights Reserved.</p>
                </footer>
            </Container>
        );
    }
}

export default CreateProduct;
