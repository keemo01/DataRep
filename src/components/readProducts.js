import React, { Component } from 'react';
import Products from './products';
import axios from 'axios';

// create class ReadProduct with product information listed
class ReadProduct extends Component {

    constructor() {
        super();
        // bind
        this.ReloadData = this.ReloadData.bind(this);
    }

    // reload when product deleted
    ReloadData() {
        // get product information from own api
        axios.get('http://localhost:4000/api/products')
            .then((response) => {
                this.setState({ products: response.data }) // update state
            }) // getting http response
            .catch((error) => {
                console.log(error);
            }); // if execption happens
    }

    // lifecycle method
    componentDidMount() {
        // get product information from own api
        axios.get('http://localhost:4000/api/products')
            .then((response) => {
                this.setState({ products: response.data }) // update state
            }) // getting http response
            .catch((error) => {
                console.log(error);
            }); // if execption happens
    }

    state = {
        products: []
    };

    render() {
        return (
            <div>
                {/* message with products listed */}
                <div className="form">
                    <h2 className="header">Products in the database</h2>
                </div>
                <Products products={this.state.products} ReloadData={this.ReloadData}></Products>
            </div>
        )
    }
}

export default ReadProduct; // export