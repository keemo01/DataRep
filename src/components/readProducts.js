import React, { Component } from 'react';
import Products from './products';
import axios from 'axios';

class ReadProduct extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            searchQuery: '',
            filteredProducts: []
        };
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = () => {
        axios.get('http://localhost:4000/api/products')
            .then((response) => {
                this.setState({ products: response.data }, () => {
                    this.filterProducts();
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    filterProducts = () => {
        const { products, searchQuery } = this.state;
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        this.setState({ filteredProducts: filtered });
    };

    handleSearch = (event) => {
        this.setState({ searchQuery: event.target.value }, () => {
            this.filterProducts();
        });
    };

    render() {
        const { filteredProducts } = this.state;

        return (
            <div>
                <div className="form">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h2 className="header">Products in the database</h2>
                        <input
                            type="text"
                            placeholder="Search products"
                            value={this.state.searchQuery}
                            onChange={this.handleSearch}
                            style={{ marginLeft: '10px' }} // Adding some space between header and search bar
                        />
                    </div>
                </div>
                <div className="products">
                    <Products products={filteredProducts} ReloadData={this.fetchProducts} />
                </div>

                {/* Footer section */}
                <footer style={{ backgroundColor: 'black', color: 'white', padding: '20px', textAlign: 'center', marginTop: '20px' }}>
                <h4>Al Jabarah</h4>
                    <p>123 Store Street, City</p>
                    <p>Contact: 0899-230-164</p>
                    <p>Email: info@aljabarahstore.com</p>
                    {/* Add any other relevant information */}
                </footer>
            </div>
        );
    }
}

export default ReadProduct;
