import jwt from 'jsonwebtoken'
import config from '../config.js'

export function jwtValidation(req, res, next) {
    const token = req.header('auth-token')
    if (token) {
        try {
            //devuelve payload
            const verify = jwt.verify(token, config.jwt.key)
            req.user = verify
            next()
        } catch (e) {
            res.status(400).json({
                err: 400,
                msg: "Token incorrecto"
            })
        }
    } else {
        res.status(400).json({
            err: 400,
            //token no enviado
            msg: "Acceso denegado"
        })
    }
}

//encapsulamos la creación del token
//recibe data o payload (en este caso user)
export function createToken(data){
    return jwt.sign(data, config.jwt.key)
}

export default {
    jwtValidation,
    createToken
}