'use strict'

const mongoose = require('mongoose');

// 1) Conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Conectado!');
});

// 2) Definido un esquema y un modelo
/* const Cat = mongoose.model('Cat', {
    name: String
}); */

const kittySchema = new mongoose.Schema({
    name: String
});

const Cat = mongoose.model('Cat', kittySchema);

// 3) Hemos construido un objeto del tipo creado en 2)
const kitty = new Cat({name: 'Félix'});

// 4) Hemos almacenado el objeto creado en 3) en nuestra base de datos
/*kitty.save()
    .then(() => console.log('meow'));*/

Cat.find({ name: /^Misi/  },
    (err, gatitos) => {
    if (err) return console.log(err);
    console.log(gatitos);
});