const express = require('express');

const path = require("path");

require('dotenv').config();


const {PORT} = process.env;

const apiRouter = require('./api/main');

const app = express();

app.use(express.json());


const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


app.get('/', function(req, res, next){
  res.send("API de Red Social");
});

app.use('/api', apiRouter);

app.use('/public', express.static('public'));


app.listen(PORT, function(error) {
  if (error){
    console.error(error);
    process.exit(1);
  }
  console.log(`Escuchando en el puerto ${PORT}`);
});