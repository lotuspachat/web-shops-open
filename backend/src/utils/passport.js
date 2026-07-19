import passport from "passport";
// import { strategies as GoogleStrategy } from 'passport-google-oauth20';
import userModel from "../models/user.modal.js";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { gen_random_alphanumber, gen_random_profile_pic } from "./genRandom.js";

passport.use(new GoogleStrategy({
clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    callbackURL: '/api/auth/oauth2/redirect/google', 
    scope: ['profile', 'email']
},
async function varify(accessToken, refreshToken, profile, cb) {

    try {
        // console.log( profile , "this is proifle");
        // console.log(
        //    profile.id,
        //   profile.displayName,
        //   profile.emails[0].value,
        //    profile.provider,
        //    profile.photos[0].value,
        // "this is the data we have on profile"

        // )
        const userEmail = profile.emails[0].value;
        const user = await userModel.findOne({email : userEmail});
        if (user){
         return cb(null, user);
      }
      const new_user = await userModel.create({
        user_id : profile.id,
        username : profile.displayName,
        email : profile.emails[0].value,
        auth_provider : profile.provider,
        profile_photo : profile.photos[0].value
      })
    
     return cb(null, new_user);
    }catch(errr)
    {
        console.error("unexpected error has occuerd" , errr);
        return cb(errr, null);
    }
    
}))


export default passport