const express = require('express');
const app = express();
const morgan = require ('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));
// Parse urlencoded data without extended data and JSON data
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Error handling for undeclared routes
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;