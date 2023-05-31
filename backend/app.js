const mysql = require('mysql');
const express = require('express');
const cors = require("cors");
const app = express();
require("dotenv").config();

const model = require("./models/index.model");
const postsRouter = require("./routes/post.router");
const usersRouter = require("./routes/user.router");


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
app.use("/api/posts", postsRouter);
app.use("/api/signup",  usersRouter);
module.exports = app;