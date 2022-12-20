const express = require('express');
const cors = require('cors');

// create and config server
const server = express(); //creamos servidor, inicia el proceso de escuchar
server.use(cors()); // configuramos el servidor para que sea una API pública, si quitamos cors será API privada
server.use(express.json({ limit: '10Mb' })); //configuramos el servidor le decimos q vamos a trabajar con Json

// init express aplication
const serverPort = 4000;
// asociado a la línea 5 
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// endpoint 

server.get('/movies', (req, res) => {
  const response = {

    success: true,
    movies: [
      {
        id: '1',
        title: 'Gambita de dama',
        gender: 'Drama',
        image: 'https://via.placeholder.com/150'
      },
      {
        id: '2',
        title: 'Friends',
        gender: 'Comedia',
        image: 'https://via.placeholder.com/150'
      }
    ]

  };
  res.json(response);
});