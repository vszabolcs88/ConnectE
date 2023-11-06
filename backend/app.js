const mysql = require('mysql');
const express = require('express');
const cors = require("cors");
const path = require('path');
const helmet = require('helmet');
const hpp = require('hpp');
const app = express();
require("dotenv").config();

const model = require("./models/index.model");
const postsRouter = require("./routes/post.router");
const usersRouter = require("./routes/user.router");
const profileRouter = require("./routes/profile.router");

//helmet middleware
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin" }));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(cors());

app.use((req, res, next) => model.initDatabase(req, res, next()));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(hpp());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/posts", postsRouter);
app.use("/api/signup", usersRouter);
app.use("/api/profile", profileRouter);
module.exports = app;