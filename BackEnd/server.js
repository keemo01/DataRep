const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB Connection
const myConnectionString = 'mongodb+srv://g00366442:Ajstar11@cluster0.fc4rsgr.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, { useNewUrlParser: true });

// Schema & Model Definitions
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    qty: String,
    image: String
});
const ProductModel = mongoose.model("product", productSchema);

const newsSchema = new Schema({
    title: String,
    description: String,
    // Add other fields as needed: image, author, content, etc.
});
const NewsModel = mongoose.model('News', newsSchema);

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Products
app.get('/api/products', (req, res) => {
    ProductModel.find((err, data) => {
        res.json(data);
    });
});



app.get('/api/products/:id', (req, res) => {
    ProductModel.findById(req.params.id, (err, data) => {
        res.json(data);
    });
});

app.post('/api/products', (req, res) => {
    ProductModel.create({
        name: req.body.name,
        qty: req.body.qty,
        image: req.body.image
    });
    res.send('Product Added');
});

app.put('/api/products/:id', (req, res) => {
    ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (err, data) => {
            res.send(data);
        });
});

app.delete('/api/products/:id', (req, res) => {
    ProductModel.deleteOne({ _id: req.params.id }, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    });
});

// News
app.get('/api/news', async (req, res) => {
    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                country: 'us',
                apiKey: 'YOUR_NEWS_API_KEY',
            },
        });
        const articles = response.data.articles;
        res.json(articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.post('/api/news/save', async (req, res) => {
    try {
        const { title, description, /* other fields */ } = req.body;
        const newArticle = new NewsModel({
            title,
            description,
            // Assign other fields accordingly
        });
        await newArticle.save();
        res.status(201).json({ message: 'Article saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save article' });
    }
});

app.get('/api/saved-articles', async (req, res) => {
    try {
        const savedArticles = await NewsModel.find();
        res.json(savedArticles);
    } catch (error) {
        console.error('Error fetching saved articles:', error);
        res.status(500).json({ error: 'Failed to fetch saved articles' });
    }
});

// Server Setup
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
