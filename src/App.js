import React, { Component, useEffect, useState } from 'react';
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
  Redirect
} from "react-router-dom";
import EditProducts from './components/editProducts';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);

    // Check if user is authenticated
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, []);

    const handleLogout = () => {
        // Clear authentication state and remove token from local storage
        setAuthenticated(false);
        localStorage.removeItem('token');
    };

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      authenticated === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  );

  return (
    <Router>
    <div className="App">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Al Jabarah</Navbar.Brand>
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              {authenticated && <Nav.Link href="/readProducts">Product List</Nav.Link>}
              {authenticated && <Nav.Link href="/createProducts">Add Product</Nav.Link>}
              {authenticated && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}

            </Nav>
          </Container>
        </Navbar>
        <Switch>
        <Route path="/login">
                <Login setAuthenticated={setAuthenticated} />
        </Route>
          <Route path="/register" component={Register} />
          <PrivateRoute path="/" component={MainPage} exact />
          <PrivateRoute path="/readProducts" component={ReadProducts} />
          <PrivateRoute path="/createProducts" component={CreateProducts} />
          <PrivateRoute path="/editProduct/:id" component={EditProducts} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
