import mongoose  from "mongoose";

const testschema = new mongoose.Schema( 
    {
        name: String,
        status: String, 
        stocks: String ,
        category : String
    }
);

const test = mongoose.model( "test_project" , testschema , "test_data");
export {test};