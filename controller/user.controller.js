import userDao from '../model/user.dao.js'
import {
    createToken
} from '../middleware/jwt.middleware.js'
import * as yup from 'yup'

let registerScheme = yup.object({
    name: yup.string().required("El nombre es un campo requerido"),
    email: yup.string().email().required("El mail es un campo requerido"),
    password: yup.string().required("La contraseña es un campo requerido"),
}).noUnknown()

export function register(req, res) {
    registerScheme.validate(req.body)
        .then((user) => {
            userDao.register(user)
        })
        .then(function () {
            res.json({
                msg: "Usuario creado"
            })
        })
        .catch(function (err) {
            //400: bad request error (error al crear usario)
            res.status(400).json({
                error: 400,
                msg: err.msg,
                err: err
            })
        })
}

export function login(req, res) {
    userDao.login(req.body.email, req.body.password)
        .then(function (user) {
            //mando el payload (data del usuario)
            //mando clave secreta
            const token = createToken(user)
            res.json({
                user,
                token
            })
        })
        .catch(function (err) {
            res.status(400).json({
                error: 400,
                msg: err.msg,
                err: err
            })
        })
}

export function getAllUsers(req, res) {
    userDao.getAllUsers()
        .then(function (users) {
            res.json({
                users
            })
        })
        .catch(function (err) {
            res.status(400).json({
                error: 400,
                msg: err.msg,
                err: err
            })
        })
}

export default {
    register,
    login,
    getAllUsers
}