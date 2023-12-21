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
    
    handleEdit = (id) => {
        // Navigate to the EditProduct component with the product ID
        this.props.history.push(`/editProduct/${id}`);
      };
      

    handleDelete = (id) => {
        // Send a DELETE request to the server with the product ID
        axios.delete(`http://localhost:4000/api/products/${id}`)
            .then((response) => {
                console.log(response.data); // Log the deletion response
                // Update the UI by removing the deleted product from the state
                const updatedProducts = this.state.filteredProducts.filter(product => product._id !== id);
                this.setState({ filteredProducts: updatedProducts });
            })
            .catch((error) => {
                console.log(error);
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
                            style={{ marginLeft: '10px' }}
                        />
                    </div>
                </div>
                <div className="products">
                    <Products products={filteredProducts} ReloadData={this.fetchProducts} />
                    {filteredProducts.map(product => (
                        <div key={product._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
                            <h3>{product.name}</h3>
                            <p>Quantity: {product.qty}</p>
                            <img src={product.image} alt={product.name} style={{ width: '100px', marginRight: '10px', float: 'left' }} />
                            <div style={{ overflow: 'hidden' }}>
                                <p style={{ wordWrap: 'break-word' }}>Comment: {product.comment}</p>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <button onClick={() => this.handleEdit(product._id)}>Edit</button>
                                <button onClick={() => this.handleDelete(product._id)}>Delete</button>
                            </div>
                            <div style={{ clear: 'both' }}></div>
                            <hr />
                        </div>
                    ))}
                </div>

                <footer style={{ backgroundColor: 'black', color: 'white', padding: '20px', textAlign: 'center', marginTop: '20px' }}>
                    <h4>Al Jabarah</h4>
                    <p>123 Store Street, City</p>
                    <p>Contact: 0899-230-164</p>
                    <p>Email: info@aljabarahstore.com</p>
                </footer>
            </div>
        );
    }
}

export default ReadProduct;
