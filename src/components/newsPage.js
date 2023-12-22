import React, { Component } from 'react';
import axios from 'axios';
import './NewsPage.css';

class NewsPage extends Component {
  state = {
    articles: [],
    searchQuery: '',
    selectedArticle: null, // Track the selected article
  };

  componentDidMount() {
    this.fetchNews();
    this.newsTimer = setInterval(this.fetchNews, 1 * 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.newsTimer);
  }

  fetchNews = () => {
    const { searchQuery } = this.state;

    axios
      .get('https://newsapi.org/v2/top-headlines', {
        params: {
          country: 'us',
          apiKey: '7e07333e33234db8ac28e319fd52cdd4', // Replace with your News API key
          q: searchQuery,
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

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value }, () => {
      this.fetchNews();
    });
  };

  handleArticleClick = (article) => {
    window.open(article.url, '_blank'); // Opens the article URL in a new tab/window
  };
  

  handleBack = () => {
    this.setState({ selectedArticle: null });
  };

  render() {
    const { articles, searchQuery, selectedArticle } = this.state;

    if (selectedArticle) {
      return (
        <div className="single-article">
          <button onClick={this.handleBack}>Back to News</button>
          <h2>{selectedArticle.title}</h2>
          <div className="article-content">
            <div className="article-details">
              <img className="article-image" src={selectedArticle.urlToImage} alt={selectedArticle.title} />
              <div className="article-text">
                <p>{selectedArticle.description}</p>
                <p>{selectedArticle.content}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="news-page">
        <h1>Latest News</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for news..."
            value={searchQuery}
            onChange={this.handleSearchChange}
          />
        </div>
        <div className="news-grid">
          {articles.map((article, index) => (
            <div key={index} className="news-article" onClick={() => this.handleArticleClick(article)}>
              <div className="news-article-content">
                <div className="news-article-image">
                  <img src={article.urlToImage} alt={article.title} />
                </div>
                <div className="news-article-info">
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  <p>Author: {article.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default NewsPage;