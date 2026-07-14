import mongoose from "mongoose";
import config from "./config.js";

async function connect_to_db() {
    try{
        await mongoose.connect(config.MONGO_URI);
        console.log( "Connected to database");
    }catch(error)
    {
        console.error( `Unable to connect to database with error ${error}`);
    }
}

export default connect_to_db;