import { Router  } from "express";
import * as authController from "../controller/auth.controller.js"
import * as thirdPartyAuthProvider from "../controller/thirdPartyAuth.js"

const authRouter = Router();
// import passport from "passport";
import passport from "../utils/passport.js";
import { get } from "mongoose";


/*
GET request foe getting profile data
*/
authRouter.get( "/get" , authController.getMe)

/* 
POST  for login 
*/
authRouter.post( "/login" , authController.login );

/*
get for login for google
*/
authRouter.get('/federated/google',  thirdPartyAuthProvider.google_login);

/*
get for redirecting from google authintaction system
*/
authRouter.get( '/oauth2/redirect/google' , thirdPartyAuthProvider.google_login_redirect)

/*
POST for register 
*/
authRouter.post( "/register" , authController.register );


/*
GET rotate refresh token 
*/

authRouter.get( "/rotate" , authController.rotate_token );

/* GET logout 
*/

authRouter.get( "/logout" , authController.logout );




export default authRouter;