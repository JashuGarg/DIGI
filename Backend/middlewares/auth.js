import { getUser } from "../utils/auth.js";


function checkifuserexist(req,res,next){
    const token = req.cookies?.usercredentials;
    console.log(token);
    
    if(!token) return res.status(401).send({
            mssg:`User is not Autherised`,
            status : "UnSuccesfull"
        });

    const user = getUser(token);
        console.log(user);
        
     if (!user || !user._id) return res.status(401).send({
            mssg:`User is not Autherised`,
            status : "UnSuccesfull"
        });;
    // console.log(user);
    
    req.user = user;
    
    next();
}


export {checkifuserexist};