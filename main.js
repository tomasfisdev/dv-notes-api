import express from 'express';
import cors from 'cors'
import userRouter from './router/user.router.js'
import notesRouter from './router/notes.router.js'
import dotenv from 'dotenv';

const app = express();

app.use(cors());
app.use(express.json())
app.use('/user', userRouter);
app.use('/api/notes', notesRouter);

dotenv.config()

app.listen(80, function () {
    console.log('SERVER ON')
})