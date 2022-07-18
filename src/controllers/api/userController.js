const db = require('../../database/models');
const { login } = require('../usersController');


const user = db.User;

const controller = {
    list: (req, res) => {
        

        //GET http://localhost:3030/api/user/list
        user.findAll({
            where: {
                deleted: 0
            }
        })
            .then(listado => {
                let respuesta = {
                    meta : {
                        status: 200,
                        total: listado.length,
                        url: 'api/user/list'
                    },
                    data: listado
                };
                res.json(respuesta);
            })
            .catch(err =>{
                res.json('no se encontro')
            })
    },
    uno:(req, res)=>{
        //GET http://localhost:3030/api/user/uno
        user.findByPk(req.params.id)
        .then(result =>{
            res.json(result)
        })
    },
    create: (req, res) => {
        //POST http://localhost:3030/api/user/create
        user.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            type_user: req.body.type_user,
            email: req.body.email,
            user_dni: req.body.user_dni,
            phone_number: req.body.phone_number,
            adress: req.body.adress,
            img_user: req.body.img_user,
            password: req.body.password
        })
            .then(confirm => {
                let respuesta;
                if (confirm) {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: 'api/user/create'
                        },
                        data: confirm
                    }
                } else {
                    respuesta = {
                        meta: {
                            status: 0,
                            total: confirm.length,
                            url: 'api/actors/create'
                        },
                        data: confirm
                    }
                }
                res.json(respuesta);
            })
            .catch(error => res.send(error))
    },
    update: (req, res) => {
        // http://localhost:3030/api/user/update/1
        let actorId = req.params.id;
        user.update({
            ...req.body
        }, {
            where: {
                id: actorId
            }
        })
            .then(confirm => {
                let respuesta;
                if (confirm) {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: 'api/user/create'
                        },
                        data: confirm
                    }
                } else {
                    respuesta = {
                        meta: {
                            status: 0,
                            total: confirm.length,
                            url: 'api/actors/create'
                        },
                        data: confirm
                    }
                }
                res.json(respuesta);
            })
            .catch(error => res.send(error))
    },
    delete: (req, res) => {
        // http://localhost:3030/api/user/delete/1
        let actorId = req.params.id;
        user.update({
            deleted: 1
        }, {
            where: {
                id: actorId
            }
        })
            .then(confirm => {
                let respuesta;
                if (confirm) {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: 'api/user/create'
                        },
                        data: confirm
                    }
                } else {
                    respuesta = {
                        meta: {
                            status: 0,
                            total: confirm.length,
                            url: 'api/actors/create'
                        },
                        data: confirm
                    }
                }
                res.json(respuesta);
            })
            .catch(error => res.send(error))
    }
}

module.exports = controller;