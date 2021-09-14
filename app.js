const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const app = express();
const globalErrorController = require('./controllers/errorController');
// 1) Middleware
app.use(express.static(`${__dirname}/`));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorController);
module.exports = app;
