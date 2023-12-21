import React, { Component } from 'react';
import ProductItem from './productItem';

// create class Products with individual products listed
class Products extends Component {
    render() {
        // get products and map to individual element (product)
        return this.props.products.map((product) => {
            return <ProductItem product={product} key={product._id} ReloadData={this.props.ReloadData}></ProductItem>
        });
    }
}

export default Products; // export