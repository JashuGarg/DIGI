import express, { Router } from "express"
import { adminaddsitems,addminsupdateitem,userdeleteitem} from "../controllers/items.controllers.js"
import { checkifuserexist } from "../middlewares/auth.js";
import upload from "../utils/multerconfig.js";

const router = express.Router();


router  
    .route("/additem")
    .get( checkifuserexist,(req,res) => {
        res.send("working add items")
    })
    .post(upload.single('image'),adminaddsitems);

router
    .route("/updateitem")
    .post(addminsupdateitem);

router
    .route("/deleteitem")
    .post(userdeleteitem)
export {router}