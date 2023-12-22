const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
//const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



app.use(cors());

// determine path and work out build folder
// serve the static files from the React app
const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse appplication/json
app.use(bodyParser.json())

// connect to mongodb
const myConnectionString = 'mongodb+srv://g00366442:Ajstar11@cluster0.fc4rsgr.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, { useNewUrlParser: true });

// schema for database
const Schema = mongoose.Schema;

var productSchema = new Schema({
    name: String,
    qty: String,
    image: String
});

// create model for database for interaction
var ProductModel = mongoose.model("product", productSchema)

// get request from url, in this case '/' = home page/domain
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// get request from /api/products and response with product json
app.get('/api/products', (req, res) => {

    // find doc in database
    ProductModel.find((err, data) => {
        res.json(data);
    })

})

// returns data (products) in that id
app.get('/api/products/:id', (req, res) => {

    // interaction to get data
    ProductModel.findById(req.params.id, (err, data) => {
        // send data from database
        res.json(data);
    })
})

// post request to create new product
app.post('/api/products', (req, res) => {

    // interact to create
    ProductModel.create({
        name: req.body.name,
        qty: req.body.qty,
        image: req.body.image
    })

    // server to client to prevent duplicate creation
    res.send('Product Added');
})

// update product with specific id
app.put('/api/products/:id', (req, res) => {

    // find product with that id and update from database
    ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (err, data) => {
            res.send(data)
        })
})

// listen from http (/api/products/:id) that has delete method
app.delete('/api/products/:id', (req, res) => {

    // delete record with that specific id (id associated with delete button)
    ProductModel.deleteOne({ _id: req.params.id },
        (error, data) => {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        })
})


// handles any requests that don't match the ones above
// send html file from build folder
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/../build/index.html'));
});    

const newsSchema = new Schema({
    title: String,
    description: String,
    // Add other fields as needed: image, author, content, etc.
});

const NewsModel = mongoose.model('News', newsSchema);



app.get('/api/news', (req, res) => {
    axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
            country: 'us',
            apiKey: '7e07333e33234db8ac28e319fd52cdd4',
        },
    })
    .then((response) => {
        const articles = response.data.articles;
        res.json(articles);
    })
    .catch((error) => {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Failed to fetch news' });
    });
});


app.post('/api/news/save', async (req, res) => {
    try {
      const { title, description, /* other fields */ } = req.body;
  
      // Create a new news article using the NewsModel and save it to the database
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


// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});