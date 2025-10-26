import express from "express";
import { userlogin, usersignup } from "../controllers/users.controller.js";
import { addtocart } from "../controllers/items.controllers.js";
const router = express.Router();


// free route <J>
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

    // checking routes
// router  
//     .route("/items/:id")
//     .get(checkifuserexist,sellingproducts);
   
// router  <J>
//     .route("/cart")
//     .get(checkifuserexist,getusercart);

router
    .route("/addtocart")
    .get((req,res)=>{res.send("Hi")})
    .post(addtocart)

export {router}