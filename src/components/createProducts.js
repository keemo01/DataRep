import React, { Component } from 'react';
import axios from 'axios';

class CreateProduct extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductQty = this.onChangeProductQty.bind(this);
        this.onChangeProductImage = this.onChangeProductImage.bind(this);
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
            <div className="form">
                <h2 className="header">Fill in product details to add into database</h2>
                <div className="form-container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row form-group">
                            <div className="col-3">
                                <label>Add Product Name: </label>
                            </div>
                            <div className="col-9">
                                <input type="text"
                                    className="form-control"
                                    value={this.state.Name}
                                    onChange={this.onChangeProductName}
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-3">
                                <label>Add Quantity: </label>
                            </div>
                            <div className="col-9">
                                <input type="text"
                                    className="form-control"
                                    value={this.state.Qty}
                                    onChange={this.onChangeProductQty}
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-3">
                                <label>Add Image Url: </label>
                            </div>
                            <div className="col-9">
                                <textarea type="text"
                                    className="form-control"
                                    value={this.state.Image}
                                    onChange={this.onChangeProductImage}
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                    <div className="col-3">
                        <label>Add Comment: </label>
                    </div>
                    <div className="col-9">
                        <textarea
                            className="form-control"
                            value={this.state.Comment}
                            onChange={this.onChangeProductComment.bind(this)}
                        />
                    </div>
                </div>
                        <div className="submit">
                            <input type="submit" value="Add Product" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
                <footer className="footer" style={{ position: "absolute", bottom: "0", width: "100%", backgroundColor: "black", color: "white", textAlign: "center", padding: "10px 0" }}>
                    <p>&copy; {new Date().getFullYear()} Al Jabarah. All Rights Reserved.</p>
                </footer>
            </div>
        );
    }
}

export default CreateProduct;
