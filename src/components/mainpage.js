import React, { Component } from 'react';

class MainPage extends Component {
    render() {
        return (
            <div style={{ position: "relative", minHeight: "100vh" }}>
                <div className="home-caption" style={{ backgroundImage: "url(/background.jpg)", paddingBottom: "50px" }}>
                    <h1>Welcome to the Al Jabarah customer store database</h1>
                    <h2>The time is {new Date().toLocaleTimeString()}.</h2>
                </div>
                <footer className="footer" style={{ position: "absolute", bottom: "0", width: "100%", backgroundColor: "black", color: "white", textAlign: "center", padding: "10px 0" }}>
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

export default MainPage;
