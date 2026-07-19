import mongoose  from "mongoose";

const userSchema = new mongoose.Schema (
     {
        user_id : 
        {
            type : String,
            required :[true , "Username is require"],
            unique: [true , "Username must be unique"]
        },
        username : 
        {
            type : String,
            required :[true , "Username is require"],
            // unique: [true , "Username must be unique"]
        },
        email :
        {
            type : String,
            required :[true , "Email is require"],
            unique: [true , "Email must be unique"]
        },
        password :
        {
            type : String,
            required :[
                function () {
                    return !this.auth_provider;
                },
                "Password is required when not using a third-party login"
            ]
        },
        auth_provider :
        {
            type : String,
            required :[
                function () {
                    return !this.password;
                },
                "auth_provider is required when using a third-party login"
            ]
        },
        profile_photo :
        {
            type : String,
            required :[true , "Profile pic  is require"]
        }
    }
)
const userModel = mongoose.model( /*"test_project" , userSchema ,*/ "user_auth" , userSchema);
export  default userModel;