import React, { Component } from 'react';
import axios from 'axios';
import './NewsPage.css'; // Import your CSS file for styling

class NewsPage extends Component {
  state = {
    articles: [],
  };

  componentDidMount() {
    this.fetchNews();
    // Fetch news every 30 minutes
    this.newsTimer = setInterval(this.fetchNews, 30 * 60 * 1000); // Fetch news every 30 minutes
  }

  componentWillUnmount() {
    // Clear the interval when the component unmounts to avoid memory leaks
    clearInterval(this.newsTimer);
  }

  fetchNews = () => {
    axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        apiKey: '7e07333e33234db8ac28e319fd52cdd4',
      },
    })
    .then((response) => {
      const articles = response.data.articles;
      this.setState({ articles });
    })
    .catch((error) => {
      console.error('Error fetching news:', error);
    });
  };

  render() {
    const { articles } = this.state;

    return (
      <div className="news-page">
        <h1>Latest News</h1>
        <div className="news-grid">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              className="news-article"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="news-article-content">
                <div className="news-article-image">
                  <img src={article.urlToImage} alt={article.title} />
                </div>
                <div className="news-article-info">
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  {/* Display other article details as needed */}
                </div>
                
              </div>
            </a>
          ))}
        </div>
        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p>Al Jabarah</p>
            <p>123 Store Street, City</p>
            <p>Contact: 0899-230-164</p>
            <p>Email: info@aljabarahstore.com</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default NewsPage;
