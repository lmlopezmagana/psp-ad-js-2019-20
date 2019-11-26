'use strict'

//const User      = require('../models/user');
const UserService = require('../services/user')
const bcrypt    = require('bcryptjs');
const passport  = require('passport');
const jwt       = require('jsonwebtoken');
const error_types = require('./error_types');

let controller = {
    /*
    Podríamos haber realizado el registro pasando por el middleware de passport, pero no es necesario,
    en este caso se realiza contra una base de datos asi que es muy sencillo hacerlo nosotros.
    */
    register: (req, res, next) => {
        console.log("Caso register");
        let resultado = UserService.findUser({username : req.body.username});
        if (resultado != undefined) {
            //throw new error_types.InfoError("user already exists");
            next(new error_types.InfoError("user already exists"));
        } else {
            let hash = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS));
            let inserted = UserService.insertUser({
                username: req.body.username,
                password: hash
            })
            res.json(inserted)
        }
    }
    ,
    login: (req, res, next) => {
        console.log("Caso login")
        passport.authenticate("local", {session: false}, (error, user) => {
            console.log("ejecutando *callback auth* de authenticate para estrategia local");

            if (error || !user) {
                next(new error_types.Error404("username or password not correct."))
            } else {
                console.log("*** comienza generacion token*****");
                const payload = {
                    sub: user.id,
                    exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
                    username: user.username
                };

                /* NOTA: Si estuviesemos usando sesiones, al usar un callback personalizado, 
                es nuestra responsabilidad crear la sesión.
                Por lo que deberiamos llamar a req.logIn(user, (error)=>{}) aquí*/

                /*solo inficamos el payload ya que el header ya lo crea la lib jsonwebtoken internamente
                para el calculo de la firma y así obtener el token*/
                const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, {algorithm: process.env.JWT_ALGORITHM});
                res.json({ 
                    username: user.username,
                    token: token 
                });

            }

        })(req, res)
    }


}

module.exports = controller;