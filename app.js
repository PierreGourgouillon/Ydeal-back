const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    authMiddleware = require('./middlewares/auth'),
    usersRoutes = require('./routes/users.js'),
    productsRoutes = require('./routes/products.js'),
    connectionMongoDB = require('./mongoDB/connection'),
    app = express();

connectionMongoDB()

app.use(cors());
app.use(bodyParser.json())

app.use('/api/users', authMiddleware, usersRoutes);
app.use('/api/products', authMiddleware, productsRoutes);

module.exports = app;