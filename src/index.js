const express = require('express');
const cors = require('cors');
// importo el ficheron json
const movies = require('./data/movie.json') 

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// Escribimos los endpoints que queramos
server.get('/movies', (req, res) => {
  const response = {
  success: true,
  movies: movies
  };
  res.json(response);
});
