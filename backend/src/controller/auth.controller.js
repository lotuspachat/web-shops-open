import crypto from "crypto";
import userModel from "../models/user.modal.js";
// import bcrypt from "bcrypt";
import bcrypt from "bcrypt"
import * as random from "../utils/genRandom.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import sessionModel from "../models/session.js";

function gen_refresh_token(user) {
    const refershToken = jwt.sign(
        {
            user: user.user_id,
            email: user.email
        },
        config.JWT_SECTITES,
        {
            expiresIn: "7d"     //"1d , 1h , 20d "
        }
    )
    return refershToken;
}
function gen_hashed_refresh_token(user) {
    const refershToken = jwt.sign(
        {
            user: user.user_id,
            email: user.email
        },
        config.JWT_SECTITES,
        {
            expiresIn: "7d"     //"1d , 1h , 20d "
        }
    )
    const hasedRefreshToken = crypto.createHash("sha256").update(refershToken).digest("hex");
    return hasedRefreshToken

}

export async function getMe(req, res) {

    const token = req.headers.authorization?.split(" ")[1];

    // console.log(req.headers, "i am kera yoshigaka");
    if (!token) {
        return res.status(401).json
            ({
                message: "token not found lol"
            })
    }
    const decoded = jwt.verify(token, config.JWT_SECTITES);

    const user = await userModel.findById(decoded.id);

    res.status(200).json({
        message: "user fetched succesfully",
        user: {
            username: user.username,
            email: user.email,
            photo : user.profile_photo
        }
    })

}

export async function register(req, res) {
    const saltRounds = 10;

    const { username, email, password } = req.body;
    const isUserAlredyExist = await userModel.findOne({ email: email });
    if (isUserAlredyExist) {
        return res.status(401).json({
            message: "User with same email alredy exist ."
        })

    }
    const hassedPassward = await bcrypt.hash(password, saltRounds);

    const uniqueUserId = await random.gen_random_alphanumber(30)

    const user = await userModel.create(
        {
            user_id: uniqueUserId,
            username: username,
            email: email,
            password: hassedPassward,
            profile_photo: random.gen_random_profile_pic()
        }
    )

    const refershToken = gen_refresh_token(user)
    const hasedRefreshToken = crypto.createHash("sha256").update(refershToken).digest("hex");


    const session = await sessionModel.create(
        {
            user_id: user.user_id,
            refershToken: hasedRefreshToken,
            ip: req.ip,
            userAgent: req.headers["user-agent"]
        }
    )
    const acessToken = jwt.sign({
        id: user._id,
        sessionId: session.user_id
    },
        config.JWT_SECTITES,
        {
            expiresIn: "7m"     //"1d , 1h , 20d "
        }
    )
    res.cookie("refreshToken", refershToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
    })
    res.status(201).json(
        {
            message: "User request sussesfully",
            user: {
                username: user.username,
                email: user.email,
                photo : user.profile_photo
            },
            ok : true,
            acesstoken: acessToken
        }
    )
}
export async function login(req, res) {
    const { email, password } = req.body;
    console.log( "yuppy login is called *****************************" , password , email)

    const user_account_data = await userModel.findOne({ email: email });
    if (!user_account_data) {
        res.status(401).json({ message: "email or passward is  invalid" })
        return
    }

    const isPasswardCorrect = await bcrypt.compare(password, user_account_data.password);

    if (!isPasswardCorrect) {
        res.status(401).json({ message: "email or passward is  invalid" })
        return
    }

    const refershToken = gen_refresh_token(user_account_data)
    const hasedRefreshToken = crypto.createHash("sha256").update(refershToken).digest("hex");

    const session = await sessionModel.create(
        {
            user_id: user_account_data.user_id,
            refershToken: hasedRefreshToken,
            ip: req.ip,
            userAgent: req.headers["user-agent"]
        }
    )
    const acessToken = jwt.sign({
        id: user_account_data._id,
        sessionId: session.user_id
    },
        config.JWT_SECTITES,
        {
            expiresIn: "7m"     //"1d , 1h , 20d "
        }
    )
    res.cookie("refreshToken", refershToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
    })
    res.status(201).json(
        {
            message: "User request sussesfully",
            user: {
                username: user_account_data.username,
                email: user_account_data.email,
                photo : user_account_data.profile_photo
            },
            ok : true,
            acesstoken: acessToken
        }
    )

}


export async function rotate_token(req , res) {
    const refershToken = req.cookies.refreshToken;

    if ( !refershToken)
    {
        return res.status( 401).json(
            {
                message: "Refresh token not found"
            }
        )
    }

    const decoded = jwt.verify(refershToken, config.JWT_SECTITES);
    // console.log(decoded.user_id , "this is decoadec user id")
    const refreshtokenHash = crypto.createHash("sha256").update(refershToken).digest( "hex");

    const session = await sessionModel.findOne(
        {
            refershToken :refreshtokenHash ,
            revoked: false
        }
    )
    if ( !session)
    {
        res.status(401).json(
            {
                message :"invalid refresh token"
            }
        )
        return
    }

    const acessToken = jwt.sign({ id: decoded._id },
        config.JWT_SECTITES,
        {
            expiresIn: "15m"     //"1d , 1h , 20d "
        }
    )
    const newrefershtoken = jwt.sign({ id: decoded._id },
        config.JWT_SECTITES,
        {
            expiresIn: "7d"     //"1d , 1h , 20d "
        }
    )
    const newrefreshtokenHash = crypto.createHash("sha256").update(newrefershtoken).digest( "hex");
    session.refershToken = newrefreshtokenHash;
    await session.save();
    res.cookie( "refreshToken" , newrefershtoken, {
        httpOnly: true,
        secure : true,
        sameSite :"strict",
        maxAge : 7 * 24 * 60 * 60 * 1000  // 7 days

    })

    res.status( 200).json( 
        {
            message : "Acces token refresh subkesfully",
            ok : true,
            acessToken :acessToken
        }
    )
}


export async function logout(req , res) {

    const refershToken = req.cookies.refreshToken;
    if ( ! refershToken)
    {
        res.status( 400).json(
            {
                message : "refresh token not found"
            }
        )
        return
    }
    const refreshtokenHash = crypto.createHash("sha256").update(refershToken).digest( "hex");
    const session = await sessionModel.findOne(
        {
            refershToken :refreshtokenHash ,
            revoked: false
        }
    )
    if ( !session)
    {
        res.status( 400).json(
            {
                message : "session  not found"
            }
        )
        return
    }

    session.revoked = true;
    await session.save();

    res.clearCookie("refreshToken");

    res.status( 200).json
    (
        {
            message : "Logged out succesfully",
            ok : true
        }
    )
}

export async function login_google(erq , res) {
        passport.authenticate('google');
        
}