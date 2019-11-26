'use strict'

let controller = {
    unprotected: (req,res)=>{
        res.json({ message: "Ok. ruta sin proteger"});
    },
    protected: (req,res)=>{
        console.log("caso protected");
        res.send({message :`Ok ${req.user.username}, bienvenido a la ruta protegida.`});
    },

}

module.exports = controller;