import React, { Component } from 'react';
import axios from 'axios';

// create class EditProduct
class EditProduct extends Component {
    constructor() {
        super();
        // bind
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductQty = this.onChangeProductQty.bind(this);
        this.onChangeProductImage = this.onChangeProductImage.bind(this);
        this.state = {
            Name: '',
            Qty: '',
            Image: ''
        }
    }

    // lifecycle hook
    componentDidMount() {

        // read from database
        axios.get('http://localhost:4000/api/products/' + this.props.match.params.id)
            .then(response => {
                // set state with data from database
                this.setState({
                    _id: response.data._id,
                    Name: response.data.name,
                    Qty: response.data.qty,
                    Image: response.data.image
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // invoke method when form submitted by output alert to screen with info
    handleSubmit(event) {
        alert("Product Name: " + this.state.Name + "\nQty: " + this.state.Qty + "\nImage Url: " + this.state.Image);
        event.preventDefault(); // prevent crashing

        // create newProduct object
        const newProduct = {
            name: this.state.Name,
            qty: this.state.Qty,
            image: this.state.Image,
            _id: this.state._id
        }

        // send newProduct object to server
        axios.put('http://localhost:4000/api/products/' + this.state._id, newProduct)
            .then(response => {
                console.log(response.data);
                window.location = "/readProducts" // redirect to product list page if edit successfully
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // will change name value in state when input changed
    onChangeProductName(event) {
        this.setState({
            Name: event.target.value
        })
    }

    // will set qty value in state when input changed
    onChangeProductQty(event) {
        this.setState({
            Qty: event.target.value
        })
    }

    // will set image url value in state when input changed
    onChangeProductImage(event) {
        this.setState({
            Image: event.target.value
        })
    }

    render() {
        return (
            <div className="form">
                <h2 className="header">Edit product details</h2>
                <div className="form-container">
                    {/* create form */}
                    <form onSubmit={this.handleSubmit}>
                        {/* input name */}
                        <div className="row form-group">
                            <div className="col-3">
                                <label>Change Product Name: </label>
                            </div>
                            <div className="col-9">
                                <input type="text"
                                    className="form-control"
                                    value={this.state.Name}
                                    onChange={this.onChangeProductName}
                                />
                            </div>
                        </div>
                        {/* input qty */}
                        <div className="row form-group">
                            <div className="col-3">
                                <label>Change Qty: </label>
                            </div>
                            <div className="col-9">
                                <input type="text"
                                    className="form-control"
                                    value={this.state.Qty}
                                    onChange={this.onChangeProductQty}
                                />
                            </div>
                        </div>
                        {/* input image url */}
                        <div className="row form-group">
                            <div className="col-3">
                                <label>Change Image Url: </label>
                            </div>
                            <div className="col-9">
                                <textarea type="text"
                                    className="form-control"
                                    value={this.state.Image}
                                    onChange={this.onChangeProductImage}
                                />
                            </div>
                        </div>
                        {/* add submit button */}
                        <div class="submit">
                            <input type="submit" value="Edit Product" className="btn btn-primary"></input>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default EditProduct; // export