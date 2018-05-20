"use strict"

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var appRoutes     = require("./src/route/app");
var busqueda      = require("./src/route/busqueda");
var usuarioRoutes = require("./src/route/usuario.route");
var medico        = require("./src/route/medico");
var hospital      = require('./src/route/hospital');
var login         = require("./src/route/login");
var upload        = require("./src/route/upload");
var imagenes      = require("./src/route/imagenes");

mongoose.connection.openUri('mongodb://localhost/hospitalDB', (err, res) =>{
    if (err) {
        throw err;
    }else {
        console.log("Base de datos: \x1b[32m%s\x1b[0m", "online"); 
    }
});

// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/src/upload'));

app.use('/usuario', usuarioRoutes);
app.use('/hospital', hospital );
app.use('/medico', medico );
app.use('/login', login);
app.use('/busqueda', busqueda);
app.use('/upload', upload);
app.use('/img', imagenes);
app.use('/', appRoutes);

app.listen(3000, () => {
    console.log("Express server puerto 3000: \x1b[32m%s\x1b[0m", "online");
});