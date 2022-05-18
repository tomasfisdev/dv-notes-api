import {
    dbConnection
} from "./db.js";

import { ObjectId } from 'mongodb'

//retorna todas las notas de la app
export function getAllNotes() {
    return dbConnection(async function (db) {
        return await db.collection('notes').find({}).toArray()
    })
}

//retorna una nota según id
export function getNote(id) {
    return dbConnection(async function (db) {
        return await db.collection("notes").findOne({_id: ObjectId(id)})
    })
}

//retorna notas con status default y según el id del usuario (ni archived ni bin)
export function getDefaultNotes(uid) {
    return dbConnection(async function (db) {
        return await db.collection('notes').find({
            "status": "default",
            "uid":uid
        }).toArray()
    })
}

//retorna notas con status bin y según el id del usuario (ni archived ni bin)
export function getBinNotes(uid) {
    return dbConnection(async function (db) {
        return await db.collection('notes').find({
            "status": "bin",
            "uid":uid
        }).toArray()
    })
}

//crea una nota con status default por defecto
export function createNote(note) {
    return dbConnection(async function (db) {
        const newNote = {
            title: note.title,
            text: note.text,
            status: "default",
            checked: false,
            uid: note.uid
        }
        await db.collection('notes').insertOne(newNote)
        return newNote
    })
}

//edita una nota
export function editNote(id,note) {
    return dbConnection(async function (db) {
        return await db.collection("notes").updateOne({_id: ObjectId(id)},{
            $set:{
                title:note.title,
                text:note.text
            }
        })
   })
}

//marca una nota como pendiente (su estado original)
export function checkNote(id) {
    return dbConnection(async function (db) {
        return await db.collection("notes").updateOne({_id: ObjectId(id)},{
            $set:{
              checked:true
            }
        })
   })
}

//marca una nota como terminada
export function unCheckNote(id) {
    return dbConnection(async function (db) {
        return await db.collection("notes").updateOne({_id: ObjectId(id)},{
            $set:{
              checked:false
            }
        })
   })
}

//mueve a papelera una nota según id (actualiza su status)
export function moveToBin(id) {
    return dbConnection(async function (db) {
        return await db.collection("notes").updateOne({_id: ObjectId(id)},{
            $set:{
                status:"bin"
            }
        })
    })
}

//elimina permanentemente la nota
export function deleteNote(id) {
    return dbConnection(async function (db) {
        return await db.collection("notes").deleteOne({_id: ObjectId(id)})
    })
}

//restaura la nota (cambia el status a default)
export function restoreNote(id) {
    return dbConnection(async function (db) {
        return await db.collection("notes").updateOne({_id: ObjectId(id)},{
            $set:{
                status:"default"
            }
        })
    })
}

export default {
    getAllNotes,
    getNote,
    getDefaultNotes,
    getBinNotes,
    createNote,
    editNote,
    checkNote,
    unCheckNote,
    moveToBin,
    deleteNote,
    restoreNote
}