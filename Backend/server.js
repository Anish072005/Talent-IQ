import express from 'express';
import {env} from './src/lib/env.js';

const app=express();

console.log(env.PORT);
console.log(env.DB_URL);

app.get('/',(req,res)=>{
    res.status(200).json({msg:"hello world"})
})
app.listen(env.PORT,()=>console.log(`Server started at ${env.PORT}`));