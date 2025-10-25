import express from "express"
import {laptop,speakers, console, earphones,watches,mobile, getitemdata} from "../controllers/items.controllers.js"
import { getcartitems } from "../controllers/users.controller.js";

const router = express.Router();




router
    .route("/laptop")
    .get(laptop)

router
    .route("/earphone")
    .get(earphones)

router
    .route("/mobile")
    .get(mobile)

router
    .route("/watch")
    .get(watches)

router
    .route("/console")
    .get(console)
    
router
    .route("/speaker")
    .get(speakers)


router
    .route("/cartitems")
    .get(getcartitems);

router
    .route("/generalitem")
    .get(getitemdata)



export {router}