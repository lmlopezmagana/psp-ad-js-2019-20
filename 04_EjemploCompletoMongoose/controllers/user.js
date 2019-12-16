'use strict'

const UserService = require('../services/user')
const bcrypt    = require('bcryptjs');
const passport  = require('passport');
const jwt       = require('jsonwebtoken');
const error_types = require('./error_types');
const User = require('../models/user');

let controller = {
    
    register: (req, res, next) => {
        User.find({username: req.body.username}, (err, result) => {
           if (result.length > 0) { 
                next(new error_types.Error400("user already exists"));
            } else {
                let hash = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS));
                let user = new User({
                    email: req.body.email,
                    username: req.body.username,
                    fullname: req.body.fullname,
                    roles: ['INFORMADOR'],
                    password: hash
                });

                user.save((err, user) => {
                    if (err) next(new error_types.Error400(err.message));
                    res.status(201).json(user);
                });
            }
        })
    },
    // Método que sirve para promocionar a un usuario informador a TECNICO
    upgrade: (req, res, next) => {
        // ID del usuario a modificar.
        const user_id = req.params.id
        User.findByIdAndUpdate(user_id, { $addToSet : { roles: "TECNICO" }}, {new: true}, (err, user) => {
            if (err) next(new error_types.Error500(err.message));
            if (user == null) 
                next(new error_types.Error404("No se ha encontrado ningún usuario con ese ID"))
            else
                res.status(200).json(user);
        });
    },
    login: (req, res, next) => {
        passport.authenticate("local", {session: false}, (error, user) => {
            if (error || !user) {
                next(new error_types.Error404("username or password not correct."))
            } else {
                const payload = {
                    sub: user.id,
                    exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
                    username: user.username
                };
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