const express = require("express");
const cors = require("cors");
const movies = require("./data/movies.json");
const users = require("./data/users.json")

// create and config server
const server = express(); //creamos servidor, inicia el proceso de escuchar
server.use(cors()); // configuramos el servidor para que sea una API pública, si quitamos cors será API privada
server.use(express.json({ limit: "10Mb" })); //configuramos el servidor le decimos q vamos a trabajar con Json

// init express aplication
const serverPort = 4000;
// asociado a la línea 5
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// endpoint

server.get("/movies", (req, res) => {

  const response = {
    success: true,
    movies: movies.movies,
  };
  res.json(response);
});
// El primer movies es la constante que elegimos entre back y front, 
// el segundo, es la constante que hemos importado arriba
// el tercero, es para acceder al array de objetos

// endpoint login
server.post("/login", (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const dataLogin = users.find((element) =>
    element.email.toLowerCase() === email.toLowerCase() && element.password === password);
  if (dataLogin) {
    res.json({
      success: true,
      userId: "id_de_la_usuaria_encontrada"
    });
  } else {
    res.json({
      succes: false,
      errorMessage: "Usuaria no encontrada",
    })
  }
  // const response = {

  //   success: true,
  //   users: users,
  // };
  // console.log(req.body);
  // res.json(response);
});

server.get('/movies/:movieId', (req, res) => {
  console.log('Url params:', req.params)

  console.log('Url param movieId:', req.params.movieId)

});

// ruta estática
const staticServer = "./src/public-react";
server.use(express.static(staticServer));

const staticServerImage = "./src/public-movies-images";
server.use(express.static(staticServerImage));

