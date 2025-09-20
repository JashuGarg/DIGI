import mongoose from "mongoose";

async function Connectdb(url) {
    return await mongoose.connect(url);
}


export {Connectdb} ;
