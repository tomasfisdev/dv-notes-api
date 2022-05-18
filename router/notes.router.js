import express from 'express';
import notesController from '../controller/notes.controller.js';
import {
    jwtValidation
} from '../middleware/jwt.middleware.js'

const route = express.Router();


route.get('/', [jwtValidation], notesController.getAllNotes)
    .post('/',[jwtValidation], notesController.createNote);

route.get('/default', [jwtValidation], notesController.getDefaultNotes)
route.get('/default/:id', [jwtValidation], notesController.getNote)
route.patch('/default/edit/:id',[jwtValidation], notesController.editNote)
route.patch('/default/check/:id',[jwtValidation], notesController.checkNote)
route.patch('/default/uncheck/:id',[jwtValidation], notesController.unCheckNote)
route.patch('/default/delete/:id',[jwtValidation], notesController.moveToBin)

route.get('/bin',[jwtValidation], notesController.getBinNotes)
route.get('/bin/:id',[jwtValidation], notesController.getNote)
route.patch('/bin/restore/:id',[jwtValidation], notesController.restoreNote)
route.delete('/bin/delete/:id', notesController.deleteNote)

export default route