import notesDao from '../model/notes.dao.js'

export function getAllNotes(req, res) {
    notesDao.getAllNotes()
        .then(function (notes) {
            res.json({
                notes
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

export function getNote(req, res) {
    notesDao.getNote(req.params.id)
        .then(function (note) {
            res.json({
                note
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

export function getDefaultNotes(req, res) {
    notesDao.getDefaultNotes(req.header('uid'))
        .then(function (notes) {
            res.json({
                notes
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

export function getBinNotes(req, res) {
    notesDao.getBinNotes(req.header('uid'))
        .then(function (notes) {
            res.json({
                notes
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

export function createNote(req, res) {
    notesDao.createNote({
            title: req.body.title,
            text: req.body.text,
            uid:req.header('uid')
        })
        .then(function (newNote) {
            res.json({
                msg: "Nota creada",
                newNote
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

export function editNote(req, res) {
    notesDao.editNote(
            req.params.id, {
                title: req.body.title,
                text: req.body.text,
            })
        .then(function (editedNote) {
            res.json({
                msg: "Nota editada",
                editedNote
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

export function checkNote(req, res) {
    notesDao.checkNote(req.params.id)
        .then(function () {
            res.json({
                msg: "Nota marcada como termindada",
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

export function unCheckNote(req, res) {
    notesDao.unCheckNote(req.params.id)
        .then(function () {
            res.json({
                msg: "Nota marcada como pendiente",
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

export function moveToBin(req, res) {
    notesDao.moveToBin(req.params.id)
        .then(function () {
            res.json({
                msg: "Nota eliminada",
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

export function deleteNote(req, res) {
    notesDao.deleteNote(req.params.id)
        .then(function () {
            res.json({
                msg: "Nota eliminada",
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

export function restoreNote(req, res) {
    notesDao.restoreNote(req.params.id)
        .then(function () {
            res.json({
                msg: "Nota restaurada",
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