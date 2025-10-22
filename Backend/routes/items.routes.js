import express from "express"
import { adminaddsitems, laptop,speakers, console, earphones,watches,mobile} from "../controllers/items.controllers.js"
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
    .route("/items/laptop")
    .get(laptop)

router
    .route("/items/earphone")
    .get(earphones)

router
    .route("/items/mobile")
    .get(mobile)

router
    .route("/items/watch")
    .get(watches)

router
    .route("/items/console")
    .get(console)
    
router
    .route("/items/speaker")
    .get(speakers)


export {router}