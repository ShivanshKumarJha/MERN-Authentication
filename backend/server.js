const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const workoutRoutes = require('./routes/workouts');
const userRouter = require('./routes/user');
require('dotenv').config();

app.use(
  cors({
    origin: ['https://workoutbuddy-mern.vercel.app'],
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & listening on port', process.env.PORT);
    });
  })
  .catch(error => {
    console.log(error);
  });
