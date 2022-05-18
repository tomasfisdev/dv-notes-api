import express from 'express';
import userController from '../controller/user.controller.js';
import {jwtValidation} from '../middleware/jwt.middleware.js'
const route = express.Router();


route.post('/register', userController.register);
route.post('/login', userController.login);

route.get('/', [jwtValidation], userController.getAllUsers)

export default route