import React, { Component } from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@material-ui/core';

class MainPage extends Component {
    render() {
        return (
            <div style={{ position: "relative", minHeight: "100vh", padding: "20px" }}>
                <div className="home-caption" style={{ backgroundImage: "url('/background.jpg')", paddingBottom: "50px", marginBottom: "40px" }}>
                    <Container maxWidth="md">
                        <Typography variant="h1" align="center" gutterBottom>Welcome to the Al Jabarah Customer Store Database</Typography>
                        <Typography variant="h4" align="center" gutterBottom>The time is {new Date().toLocaleTimeString()}.</Typography>
                        {/* Add more descriptive text or features of the application */}
                    </Container>
                </div>
                
                <footer className="footer" style={{ position: "absolute", bottom: "0", width: "100%", backgroundColor: "black", color: "white", textAlign: "center", padding: "10px 0" }}>
                    <Typography variant="h6">Al Jabarah</Typography>
                    <Typography variant="body1">123 Store Street, City</Typography>
                    <Typography variant="body1">Contact: 0899-230-164</Typography>
                    <Typography variant="body1">Email: info@aljabarahstore.com</Typography>
                    {/* Add any other relevant information */}
                </footer>
            </div>
        );
    }
}

export default MainPage;
