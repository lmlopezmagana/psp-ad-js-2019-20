'use strict'

const TicketService = require('../services/tickets');
const UserService = require('../services/user');
const error_types = require('./error_types');
const _ = require('lodash');

const Ticket = require('../models/ticket');


module.exports = {

    nuevoTicket: async (req, res) => {
    
        let ticket = new Ticket({
            lugar: req.body.lugar,
            puesto: req.body.puesto,
            tipo: req.body.tipo,
            comentario: req.body.comentario,
            usuario: req.user._id,
            tecnico: await UserService.randomRepairman()
        });
        
/*         ticket.save((err, ticket) => {
            if (err) res.send(500, err.message);
            res.status(201).json(ticket);
        })
 */
        ticket.save()
            .then(t => t.populate('tecnico').execPopulate())
            .then(t => t.populate('usuario').execPopulate())
            .then(t => res.status(201).json(t))
            .catch(err => res.send(500).json(err.message));
    },
    getTodos: async (req, res) => {

        try {
            let result = null;

            if (_.indexOf(req.user.roles, "TECNICO") >= 0) {
                result = await Ticket.find().exec();
            } else {
                result = await Ticket.find({usuario: req.user.id}).exec();
            }
            res.status(200).json(result);
        } catch (error) {
            res.send(500, error.message);
        }

/*         Ticket.find((err, tickets) => {
            if (err) res.send(500, err.message);
            res.status(200).json(tickets);
        });
 */    

    }


}