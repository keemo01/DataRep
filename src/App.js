import React, { Component } from 'react';
import './App.css';
import MainPage from './components/mainpage'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReadProducts from './components/readProducts';
import CreateProducts from './components/createProducts';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import EditProducts from './components/editProducts';


class App extends Component {
  // on render
  render() {
    return (
      <Router>
        <div className="App">
          {/* create navbar using bootstrap */}
          {/* Code block taken from: https://react-bootstrap.github.io/components/navbar/ */}
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">Al Jabarah</Navbar.Brand>
              <Nav>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/readProducts">Product List</Nav.Link>
                <Nav.Link href="/createProducts">Add Product</Nav.Link>
          

              </Nav>
            </Container>
          </Navbar>
          <Switch>
            {/* set route to different content */}
            <Route path="/" component={MainPage} exact />
            <Route path="/readProducts" component={ReadProducts} />
            <Route path="/createProducts" component={CreateProducts} />
            <Route path="/editProduct/:id" component={EditProducts} />
            

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App; // export
