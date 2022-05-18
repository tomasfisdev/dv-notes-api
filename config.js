import dotenv from 'dotenv';
dotenv.config()

export default{
 db:{
     name:process.env.MONGO_NAME|| 'dv_notes',
     port:process.env.MONGO_PORT|| '27017',
     host:process.env.MONGO_HOST || 'localhost',
 }, 
 jwt:{
     key:process.env.JWT_KEY || 'lalala'
 }   
}