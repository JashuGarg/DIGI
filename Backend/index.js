// import cookieparser from "cookieparser";
import express from "express" ;
import { router as userrouter }  from "./routes/user.route.js";
import { router as adminrouter } from "./routes/admin.routes.js";
import { router as itemrouter } from "./routes/item.routes.js";
import { Connectdb } from "./connect.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";


dotenv.config();
const url = process.env.MONGOURL;
const port = process.env.PORT;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middlewares

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));




Connectdb(url).then(()=>{
    console.log("DataBase connected succesfully");
}).catch((err)=>{
    console.log("Err in connecting DB: ",err);
})

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../Frontend")));

//routes

app.use("/users",userrouter);
app.use("/admin",adminrouter);
app.use("/item",itemrouter);


//server 
app.listen(port,(err)=>{
    try {
        console.log(`Server is Live at Port: ${port} `);
        console.log(`Website link: http://localhost:3000/`);
        
        
    } catch (error) {
        console.log("Error in connecting to server at port: ",port);      
    }
})