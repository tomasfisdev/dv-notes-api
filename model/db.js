import mongodb from 'mongodb'
import config from '../config.js'
//creamos cliente de mongo

const client = new mongodb.MongoClient(`mongodb://${config.db.host}:${config.db.port}`)

export async function dbConnection(callback) {
    await client.connect()
    const result = await callback(client.db(config.db.name))
    await client.close()
    return result
}

export default {
    dbConnection
}