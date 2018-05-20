var express = require("express");

var app = express();
var md_aut = require('../middlewares/autenticacion');

var Hospital = require("../models/hospital");


/*
Listar usuarios
*/
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Hospital.find({})
        .skip(desde)
        .limit(4)
        .populate('usuario', 'nombre email')
        .exec(
            (err, hospitales) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando hospitales',
                        errors: err
                    });
                }

                Hospital.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        hospitales: hospitales,
                        total: conteo
                    });
                });
            });
});


/*
Actualizar hosiptal
*/
app.put('/:id',md_aut.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Hospital.findById(id, (err, hospital) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar hospital',
                errors: err
            });
        }
        if (!hospital) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El hospital con el id' + id + ' no existe',
                errors: { message: "No existe un hospital con ese ID" }
            });
        }
        hospital.nombre = body.nombre;
        hospital.usuario = req.usuario._id;

        hospital.save((err, hospitalGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar hospital',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                usuario: hospitalGuardado
            });
        });
    });
});

/*
Create hospital
*/
app.post('/', md_aut.verificaToken, (req, res) => {
    var body = req.body;

    var hospital = new Hospital({
        nombre      : body.nombre,
        usuario     : req.usuario._id
    });

    hospital.save((err, hospitalGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear hospital',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            hospital: hospitalGuardado
        });
    });
});

/*
Eliminr hospital por el id
*/

app.delete('/:id',md_aut.verificaToken, (req, res) =>{
    var id = req.params.id;
    Hospital.findByIdAndRemove(id, (err, hospitalBorrado)=>{

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar hospital',
                errors: err
            });
        }

        if (!hospitalBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe hospital con ese ID',
                errors: {message:'No existe un hospital con ese id'}
            });
        }
        res.status(200).json({
            ok: true,
            hospital: hospitalBorrado
        });
    });
});

module.exports = app;