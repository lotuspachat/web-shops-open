import config from "../config/config.js";
import crypto from "crypto"
import userModel from "../models/user.modal.js";
import { error } from "console";


export async function gen_random_alphanumber(lenght) {

    // const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowers = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    // const symbols = '!@<>?{}[]#$%^&*_-+=';
    const allChars = lowers + numbers ;

    let word = "";
    let isUnique = true;
    while (isUnique) 
    {
        word = ""

        for (let i = 0; i < lenght; i++) {
            const randomInt = crypto.randomInt(0, allChars.length);
            word += allChars[randomInt];
        }
        const isIdExos = await userModel.findOne({user_id : word})
        if ( ! isIdExos)
        {
            isUnique = false
        }
    }
    return word;
}


export function gen_random_profile_pic() {

    const rancom_int =  crypto.randomInt( 0 , 36);
    console.log(rancom_int , "this is random int" , rancom_int.toString());
    const str = `${config.PROFILE_PIC}`
    const apple = str.replaceAll("@" , rancom_int.toString());
    return apple;
}

