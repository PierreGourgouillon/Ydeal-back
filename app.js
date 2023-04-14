const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    authMiddleware = require('./middlewares/auth'),
    usersRoutes = require('./routes/users.js'),
    productsRoutes = require('./routes/products.js'),
    connectionMongoDB = require('./mongoDB/connection'),
    app = express();

connectionMongoDB()
  
const corsOptions = {
    origin: ['http://localhost:4200', 'https://ydeal.herokuapp.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
  
app.options('*', cors(corsOptions));
app.use(bodyParser.json())

app.use('/api/users', authMiddleware, usersRoutes);
app.use('/api/products', productsRoutes);

module.exports = app;