const express = require("express");
const cors = require("cors");
const movies = require("./data/movies.json");
const users = require("./data/users.json")

// create and config server
const server = express(); //creamos servidor, inicia el proceso de escuchar
server.use(cors()); // configuramos el servidor para que sea una API pública, si quitamos cors será API privada
server.use(express.json({ limit: "10Mb" })); //configuramos el servidor le decimos q vamos a trabajar con Json
server.set('view engine', 'ejs');

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
});

// :movieID = esto es igual a URL params que en web se ve como /(movieID)=nº de ID ejemplo: movies/1
server.get('/movies/:movieId', (req, res) => {
  //primer movies es el importado arriba el segundo movies es el del array de movies.json
  const foundMovie = movies.movies.find((movie) => movie.id === req.params.movieId);
  //con esta línea estamos pintando nuestra plantilla y no es necesario poner view, lo interpreta solo
  res.render("movie", foundMovie);
  // console.log('Url params:', req.params)
  res.json(foundMovie);

}

);

/* Esto es un ejemplo
app.get("/es/film:filmId.html", (req, res) => {
  // get film data
  const filmData = films.find((film) => film.id === req.params.filmId);
  console.log("film data", filmData);

  // response with rendered template
  if (filmData) {
    res.render("pages/film", filmData);
  } else {
    res.render("pages/film-not-found");
  }
});
*/


// ruta estática
const staticServer = "./src/public-react";
server.use(express.static(staticServer));

const staticServerImage = "./src/public-movies-images";
server.use(express.static(staticServerImage));


const staticServerCss = "./src/public-styles";
server.use(express.static(staticServerCss));


