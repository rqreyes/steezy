/* eslint-disable no-unused-vars */
const createError = require('http-errors');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.resolve(__dirname, 'config/.env') });

const userRouter = require('./routes/user');
const classRouter = require('./routes/class');

const app = express();

app.use(express.json());
app.use(express.static('dist'));

app.use('/user', userRouter);
app.use('/class', classRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

// port listener
app.listen(process.env.PORT || 8080, () => {
  console.log(`Listening on port ${process.env.PORT || 8080}!`);
});

// connect to database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((err) => {
    throw err;
  });
mongoose.connection.on('connected', () => console.log('Connected to database'));

module.exports = app;
