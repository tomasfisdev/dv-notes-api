import {
    dbConnection
} from "./db.js";
import bcrypt from "bcrypt";

//crea nuevo usuario
export async function register(user) {
    return dbConnection(async function (db) {
        const newUser = {...user}
        //verifica que no se repita el mail
        //retorna (en caso de éxito) el obj de usuario
        const repeatedUser = await db.collection('users').findOne({
            email: newUser.email
        })

        //si no hay usuario repetido lo crea
        if (!repeatedUser) {
            const salt = await bcrypt.genSalt(10)
            const HashedPassword = await bcrypt.hash(newUser.password, salt)
            newUser.password = HashedPassword

            await db.collection('users').insertOne(newUser)
            return newUser
        } else {
            throw {
                error: 1000,
                msg: 'Este usuario ya existe'
            }
        }
    })
}

//loguea al usuario
export function login(email, password) {
    return dbConnection(async function (db) {
        //verifica que no exista el usuario
        //retorna (en caso de éxito) el obj de usuario
        const user = await db.collection('users').findOne({
            email: email
        })
        if (user) {
            const validatePassword = await bcrypt.compare(password, user.password)
            if (validatePassword) {
                return {
                    ...user,
                    password: null
                }
            } else {
                throw {
                    error: 1000,
                    msg: 'La contraseña es incorrecta'
                }
            }
        } else {
            throw {
                error: 1000,
                msg: 'Este usuario no existe'
            }
        }
    })
}
export function getAllUsers() {
    return dbConnection(async function (db) {
        return await db.collection('users').find({}).toArray()
    })
}

export default {
    register,
    login,
    getAllUsers
}