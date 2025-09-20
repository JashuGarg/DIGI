import express from "express";
import { checkifuserexist } from "../middlewares/auth.js";
import { userlogin, usersignup, getusercart } from "../controllers/users.controller.js";
import { sellingproducts } from "../controllers/items.controllers.js";
const router = express.Router();



router
    .route("/api")
    .get((req,res)=>{
        res.send("hello server is live");
    })


router
    .route("/api/signup")
    .get((req,res)=>{
        res.status(202).send({
            msg: "Welcome to User Signup Page",
            status: "Successfull",
        })
    })
    .post(usersignup);

router
    .route("/api/login")
    .get((req,res)=>{
        res.status(202).send({
            msg: "Welcome to User login Page",
            status: "Successfull",
        })
    })
    .post(userlogin);

router  
    .route("/items/:id")
    .get(checkifuserexist,sellingproducts);
   
router 
    .route("/cart")
    .get(checkifuserexist,getusercart);

export {router}