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
            Image: ''
        };
    }

    handleSubmit(event) {
        event.preventDefault(); // Prevents the default form submission action from occurring.

        // Creating a new product object with data from the state.
        const newProduct = {
            name: this.state.Name,
            qty: this.state.Qty,
            image: this.state.Image
        };

        axios.post('http://localhost:4000/api/products', newProduct)
            .then((res) => {
                console.log(res); // Logging the response from the server to the console.
                // If needed, add further actions upon successful API call.
            })
            .catch((err) => {
                console.log(err); // Logging any errors to the console.
                // Handle errors gracefully or display them to the user.
            });

        // Resetting the state to empty values for another product after submission.
        this.setState({
            Name: '',
            Qty: '',
            Image: ''
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
