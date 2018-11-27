// ===========================================================
const express = require('express');
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);


//const bodyParser = require('body-parser');

//const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;

var db = require("./models");

//Initialize Express

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// Import our routes and pass it 'app' as an argument
require('./sockets/task-sockets.js')(io);
require('./routes/routes.js')(app);



// Listener
// ===========================================================
db.sequelize.sync().then(function() {
    server.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });