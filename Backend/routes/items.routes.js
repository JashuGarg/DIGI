import express from "express"
import { adminaddsitems } from "../controllers/items.controllers.js"
import { checkifuserexist } from "../middlewares/auth.js";


const router = express.Router();


router  
    .route("/additem")
    .get( checkifuserexist,(req,res) => {
        res.send("working add items")
    })
    .post(adminaddsitems);

export {router}