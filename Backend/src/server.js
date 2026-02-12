import express from 'express';
import {env} from './lib/env.js';
import path from "path"
const app=express();

const __dirname=path.resolve();

app.get('/health',(req,res)=>{
    res.status(200).json({msg:"hello world"})
})


app.get('/books',(req,res)=>{
    res.status(200).json({msg:"this is thw books endpoint"})
})


if(env.NODE_ENV==="production"){
app.use(express.static(path.join(__dirname,"../Frontend/dist")));

app.get("/{*any}",(req,res)=>{
    res.sendFile(path.join(__dirname,"..Frontend","dist","index.html"));
})
}
app.listen(env.PORT,()=>console.log(`Server started at ${env.PORT}`));