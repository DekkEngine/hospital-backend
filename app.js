"use strict"

var express = require("express");
var mongoose = require("mongoose");

var app = express();

mongoose.connection.openUri('mongodb://localhost/hospitalDB', (err, res) =>{

if (err) {
    throw err;
}else {
    console.log("Base de datos: \x1b[32m%s\x1b[0m", "online"); 
}

});

app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Petición realizada correctamente'
    })
})

app.listen(3000, () => {
    console.log("Express server puerto 3000: \x1b[32m%s\x1b[0m", "online");
});