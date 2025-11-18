const express = require('express');
const path = require("path");

require('dotenv').config();

const {PORT} = process.env;

const apiRouter = require('./api/main');

const app = express();

app.use(express.json());


app.get('/', function(req, res, next){
  res.send("API de Red Social");
});

app.use('/api', apiRouter);

app.listen(PORT, function(error) {
  if (error){
    console.error(error);
    process.exit(1);
  }
  console.log(`Escuchando en el puerto ${PORT}`);
});