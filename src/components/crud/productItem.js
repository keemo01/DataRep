import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

// create class ProductItem to show product information
class ProductItem extends Component {
    constructor() {
        super();
        // bind else will get exception
        this.DeleteProduct = this.DeleteProduct.bind(this);
    }

    DeleteProduct() {

        // delete product with specific id
        axios.delete('http://localhost:4000/api/products/' + this.props.product._id)
            .then(() => {
                // reload data when product is deleted
                this.props.ReloadData();
            })
            .catch();
    }

    render() {
        return (
            // get every element and put into card using bootstrap
            <div className="card">
                {/* set border, backgound colour and width */}
                <Card border="secondary" bg="light" style={{ width: '40rem' }}>
                    <Card.Header><b>{this.props.product.name}</b></Card.Header>
                    <Card.Body>
                        <blockquote>
                            <img src={this.props.product.image} className="cardImg"></img>
                            <footer>
                                Qty: {this.props.product.qty}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    {/* button for edit/update by changing url with id*/}
                    <Link to={"/edit/" + this.props.product._id} className="btn btn-primary">Edit</Link>
                    {/* button for delete */}
                    <Button variant="danger" onClick={this.DeleteProduct}>Delete</Button>
                </Card>
            </div>
        )
    }
}

export default ProductItem; // export