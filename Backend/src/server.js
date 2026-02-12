import express from 'express';
import {env} from './lib/env.js';
import path from "path"
import {connectDB} from './lib/db.js';
import { fileURLToPath } from 'url';
import cors from "cors";
import {serve} from "inngest/express";
import { inngest,functions } from './lib/inngest.js';


const app=express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware
app.use(express.json());
//credentials:true means that the server will allows browser to include  cookies on request.
app.use(cors({origin:env.CLIENT_URL,credentials:true}));    


app.use("/api/inngest",serve({client:inngest,functions}))

app.get('/health',(req,res)=>{
    res.status(200).json({msg:"hello world"})
})


app.get('/books',(req,res)=>{
    res.status(200).json({msg:"this is thw books endpoint"})
})


if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "Frontend", "dist");

  app.use(express.static(frontendPath));

  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

const startserver=async()=>{
    try {
        await connectDB();
        const Port=process.env.PORT || 3000;
         app.listen(Port,()=>{
        console.log(`✅Server is running on port ${Port}`)
    })
    } catch (error) {
        console.log("❌ Error starting server",error);
    }
 
};
startserver();