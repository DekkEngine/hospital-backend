"use strict"

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var appRoutes = require("./src/route/app");
var usuarioRoutes = require("./src/route/usuario.route");
var login = require("./src/route/login");

mongoose.connection.openUri('mongodb://localhost/hospitalDB', (err, res) =>{
    if (err) {
        throw err;
    }else {
        console.log("Base de datos: \x1b[32m%s\x1b[0m", "online"); 
    }
});

app.use('/usuario', usuarioRoutes);
app.use('/login', login);
app.use('/', appRoutes);

app.listen(3000, () => {
    console.log("Express server puerto 3000: \x1b[32m%s\x1b[0m", "online");
});