import React, { Component } from 'react';
import './App.css';
import MainPage from './components/crud/mainpage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import axios from 'axios';
import ReadProducts from './components/crud/readProducts'; // Make sure the path is correct
import CreateProducts from './components/crud/createProducts'; // Ensure correct path and casing
import EditProducts from './components/crud/editProducts';
import NewsPage from './components/crud/newsPage'; // Import the NewsPage component


class App extends Component {
  
  state = {
    news: [],
  };

  componentDidMount() {
    axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        apiKey: '7e07333e33234db8ac28e319fd52cdd4',
      },
    })
    .then((response) => {
      const newsData = response.data.articles;
      this.setState({ news: newsData });
    })
    .catch((error) => {
      console.error('Error fetching news:', error);
    });
  }

  render() {
    const { news } = this.state;

    return (
      <Router>
        <div className="App">å
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">Al Jabarah</Navbar.Brand>
              <Nav>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/news">News</Nav.Link>
                <Nav.Link href="/readProducts">Product List</Nav.Link>
                <Nav.Link href="/createProducts">Add Product</Nav.Link>


              </Nav>
            </Container>
          </Navbar>
          <Switch>
            <Route path="/" component={MainPage} exact />
            <Route path="/news" component={NewsPage} />
            <Route path="/readProducts" component={ReadProducts} />
            <Route path="/createProducts" component={CreateProducts} />
            <Route path="/edit/:id" component={EditProducts} />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
